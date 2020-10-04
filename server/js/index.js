import express from 'express';
const app = express();

import mysqlx from '@mysql/xdevapi';




async function connectToSession () {
	let session;
	try {
		return await mysqlx.getSession({
			user: 'root',
			password: '',
			host: 'localhost'
		});

	} catch(e) {
		// statements
		console.log(e);
	}
}

async function chooseDatabase (session, databaseName) {
	try {
		return await session.getSchema(databaseName);
	} catch(e) {
		// statements
		console.log(e);
	}
}

async function chooseTable (database) {
	try {
		return await database.getTable('Games');
	} catch(e) {
		// statements
		console.log(e);
	}
}

async function selectDocs (table) {
	try {
		let selection = await table.select().execute();

		return await selection.fetchAll();
	} catch(e) {
		// statements
		console.log(e);
	}
}



const port = process.env.PORT || 8080;

const host = process.env.HOST || 'localhost';

app.use(express.static(__dirname));

app.get('/server/schedule', (req, res) => {
	connectToSession().then(session => {
		chooseDatabase(session, 'Basketball').then(database => {
			chooseTable(database).then(table => {
				selectDocs(table).then(docs => res.send(docs));
			})
		});
	});
});

app.get('/*', (req, res) => {
	res.sendFile(__dirname + '/index.html');
});

app.listen(port, host, () => console.log('************'));

