require('dotenv').config();
const app = require('./app');

const PORT = process.env.PORT || 8000;
const HOST = process.env.HOST || '127.0.0.1';

console.log(PORT);

app.listen(PORT, HOST, () => console.log('node server is running'));
