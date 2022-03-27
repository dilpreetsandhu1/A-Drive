import express from 'express';
const app = express();

app.get('/', (req, res) => { return res.send("Eventually we can host the front end here, but for now it's just this."); })

app.post('/', (req, res) => { })

app.listen(process.env.PORT, () => console.log(`Server started: ${process.env.PORT}`));