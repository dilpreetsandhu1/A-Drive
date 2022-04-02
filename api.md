# Authentication

## POST /api/auth/signin

Get an authentication token

+ Request

	+ Attributes (object)
		+ username (required, string)
		+ password (required, string)

	+ Body (application/json)
		
		{
			"username": "user1",
			"password": "1234",
		}

+ Response 200
	+ Body

		An access token that must be passed in the "Authorization: bearer" header for all actions requiring authentication.

# File Management

## GET /api/file/{id}

Access a file by its id

+ Parameters

	+ id

		The id of the file to access

+ Response 200

	+ Body

		The file as binary data

+ Response 403

	The specified id does not exist or the user does not have permission to read it

## GET /api/file/{id}/info

Access a file's metadata by its id

+ Parameters

	+ id

		The id of the file to access

+ Response 200

	+ Attributes (object)
		+ name (string, required)
		+ created (number, required) - unix time (UTC)
		+ modified (number) - if different from created - unix time (UTC)
		+ parent (string) - parent directory ID

	+ Body (application/json)

		{
			"name": "file.txt",
			"created": 1648852029,
			"modified": 1648852039,
			"parent": "aBp3jf4do-Y",
		}

+ Response 403

	The specified id does not exist or the user does not have permission to read it

## POST /api/file/{name}/{id}

Upload a file with a given name, optionally replacing an existing file id.

+ Parameters

	+ name

		Name of the file

	+ id (optional)

		Replace the contents of this file id with the uploaded file

+ Response 200

	File added successfully

	+ Body (text/plain)

		The file's ID

+ Response 400

	User quota exceeded

+ Response 403

	The specified id does not exist or the user does not have permission to replace it

## GET /api/dir/{id}

Read a directory.

+ Parameters

	+ id

		The id of the folder to read

+ Response 200

	+ Attributes (object)
		+ name (string, required)
		+ created (number, required) - unix time (UTC)
		+ modified (number) - if different from created - unix time (UTC)
		+ parent (string) - parent directory ID
		+ contents (array)
			+ (object)
				+ id (string, required)
				+ name (string, required)
				+ created (number, required) - unix time (UTC)
				+ modified (number) - if different from created - unix time (UTC)

	+ Body (application/json)

		{
			"name": "Files",
			"created": 1648850029,
			"modified": 1648852040,
			"parent": "CAyVFWTF07o",
			"contents" [
				{
					"id": "dQw4w9WgXcQ",
					"name": "file.txt",
					"created": 1648852029,
					"modified": 1648852039,
				}
			]
		}

+ Response 403

	The specified id does not exist or the user does not have permission to read it

## POST /api/dir/{name}/{id}

Create or rename a directory.

+ Parameters

	+ name

	+ id (optional)

		If specified, update an existing directory, instead of creating a new one.

+ Response 200

	Directory added successfully

	+ Body (text/plain)

		The directory's ID

+ Response 403

	The specified id does not exist or the user does not have permission to update it

## PUT /api/dir/{dir_id}

Move items into a directory, removing them from their current directory

+ Paremeters

	+ dir_id (optional)

		The directory to move files into. If not specified files are moved into the user's top level directory.

+ Request

	+ Attributes (array)
		+ file_id (string) - The ids of files and directories to move

	+ Body (application/json)

		[
			"dQw4w9WgXcQ",
			"aBp3jf4do-Y"
		]

+ Response 200

	Files moved successfully

+ Response 403

	The specified dir_id or file_ids do not exist or the user does not have permission to update it

## PUT /api/share/{id}

Configure users and teams access to a file or directory 

+ Request
	+ Attributes (array)
		+ (object)
			+ id (string,required) - username or team id
			+ access (string enum,required) - "READ", "WRITE", "NONE"
	+ Body (application/json)

+ Response 200
+ Response 403

# Users and Teams

## GET /api/user/{username}

Get user info

+ Response 200
	+ Attributes (object)
		+ teams (array)
			+ team_id (string)
		+ owns (array)
			+ file_id (string)
		+ shared (array)
			+ (object)
				+ id (string, required)
				+ access (string enum, required) - "READ", "WRITE"

	+ Body (application/json)
+ Response 403

## POST /api/user

Create a user

+ Request
	+ Attributes (object)
		+ username (required, string)
		+ password (required, string)

	+ Body (application/json)
		
		{
			"username": "user1",
			"password": "1234",
		}

+ Response 200
+ Response 403

## GET /api/team/{id}

Get team info

+ Response 200
	+ Attributes (object)
		+ members (array)
			+ username (string)
		+ shared (array)
			+ (object)
				+ id (string, required)
				+ write_access (bool, required)

	+ Body (application/json)
+ Response 403

## POST /api/team/{name}/{id}

Create or rename a team

+ Parameters

	+ name

	+ id (optional)

		If specified, rename an existing team, instead of creating a new one.

+ Response 200

	Team updated successfully

	+ Body (text/plain)

		The team's ID

+ Response 403

	The specified team does not exist or the user does not have permission to update it

## PUT /api/team/{id}

Change team enrollment

+ Request
	+ Attributes (array)
		+ (object)
			+ id (string,required) - username
			+ enroll (bool,required) - if true enroll in team, if false remove
	+ Body (application/json)

+ Response 200
+ Response 403