import express from 'express';
const app = express();

import pg_promise from 'pg-promise'
const pgp = pg_promise();
const db = pgp("postgres://")

import { LargeObjectManager } from 'pg-large-object';

function initDB() {
	console.log("Creating tables");

	return db.none(`
	CREATE extension IF NOT EXISTS "uuid-ossp";

	CREATE TYPE owner_type AS ENUM ('team','user','admin');
	CREATE TABLE Owners(
		OwnerName varchar(32) primary key,
		OwnerType owner_type not null,
		Quota int default 0
	);
	INSERT INTO Owners VALUES ('admin', 'admin', null);

	CREATE TABLE session(
		Sessiontoken uuid primary key,
		OwnerName varchar(32) not null references Owners(OwnerName),
		session_start timestamp not null,
		session_end timestamp
	);
	
	CREATE TYPE fs_object_type AS ENUM ('file','dir');
	CREATE TABLE FilesystemObject (
		FSID uuid primary key,
		OwnerName varchar(32) not null references Owners(OwnerName),
		Type fs_object_type not null,
		DateModified timestamp not null
	);
	CREATE TABLE FilesystemObjectData (
		FSID uuid references FilesystemObject(FSID),
		DateModified timestamp,
		UserModified varchar(32) not null references Owners(OwnerName),
		Name varchar not null,
		Type fs_object_type not null,
		Data oid,
		PRIMARY KEY (FSID, DateModified)
	);
	ALTER TABLE FilesystemObject ADD FOREIGN KEY (FSID, DateModified) REFERENCES FilesystemObjectData (FSID, DateModified)
	`);



}

function startServer() {
	app.get('/', (req, res) => { return res.send("Eventually we can host the front end here, but for now it's just this."); })

	app.use(express.json());

	app.post('/api/auth/signin', (req, res) => {
		//TODO check password
		if (req.body?.username === undefined) {
			res.status(400).end();
		} else {
			db.oneOrNone(`
			insert into session
			values ((SELECT uuid_generate_v4()),
				(select ownername from owners 
				where OwnerName = $(username)),
				CURRENT_TIMESTAMP
				)
			returning Sessiontoken;`,
				req.body)
				.then((d) => {
					if (d?.sessiontoken) {
						res.send(d.sessiontoken);
					} else {
						res.status(401).end();
					}
				})
				.catch(() => { res.send(500).end(); });
		}
	});

	app.post("/api/file/:name/:id?", (req, res) => {
		const token = req.headers?.authorization?.slice(7);
		if (token == undefined) {
			res.status(403).end();
			return;
		}
		const owner = db.oneOrNone(`
			select OwnerName from session
			where Sessiontoken = $1
		`, token);
		if (owner == undefined) {
			res.status(403).end();
			return;
		}
		// TODO Check quota
		db.tx(tx => {
			const man = new LargeObjectManager({ pgPromise: tx });
			return man.createAndWritableStreamAsync().then(([oid, stream]) => {

				req.pipe(stream);

				return new Promise((resolve, reject) => {
					stream.on('finish', () => {
						fsid = req.params.id;
						if (id == undefined) {
							fsid = tx.one(`
							insert into FilesystemObject(OwnerName,Type)
							values ($1,'file')
							returning FSID
							`, owner);
						}
						tx.none(`
							insert into FilesystemObjectData
							values ($(fsid), CURRENT_TIMESTAMP,$(owner),$(name),'file',$(oid));
							update FilesystemObject
							set DateModified = CURRENT_TIMESTAMP
							where FSID = $(fsid);
						`, { fsid: fsid, owner: owner, name: req.params.name, oid: oid })

						resolve(fsid);
					});
					stream.on('error', reject);
				});
			})
		})
			.then(id => { debugger; res.send(id.toString()); })
			.catch(() => { res.send(500).end(); });
	});

	app.listen(8080, () => console.log(`Server started: 8080`));
}

if (process.argv.includes("--init")) {
	initDB().then(startServer);
} else {
	startServer();
}