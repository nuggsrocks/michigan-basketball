import express from 'express';
const app = express();

const port = process.env.PORT;

app.use(express.static(__dirname));

app.get('*', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.listen(port);