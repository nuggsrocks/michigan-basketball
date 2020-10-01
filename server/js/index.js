import express from 'express';
import path from 'path';
const app = express();

const port = process.env.PORT || 8080;

const host = process.env.HOST || 'localhost';

app.use(express.static(__dirname));

app.get('/*', (req, res) => {
	res.sendFile(path.join(__dirname + 'index.html'));
});

app.listen(port, host, () => console.log('************'));