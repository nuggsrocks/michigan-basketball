const express = require('express');
const app = express();

const cors = require('cors');
const axios = require('axios');
const jsdom = require('jsdom');

const PORT = process.env.PORT || 8080;

const HOST = process.env.HOST || 'localhost';

app.use(cors());

app.use(express.static(__dirname + '/public'));

function findRecords (data) {
	let dom = new jsdom.JSDOM(data);

	let doc = dom.window.document;

	let dataRows = doc.querySelectorAll('div.standings__table table tbody tr');

	let records = [];

	for (let i = 0; i < dataRows.length; i++) {
		let dataIndex = dataRows[i].attributes['data-idx'].value;

		if (i < 14) {
			records[dataIndex] = {name: dataRows[i].querySelector('div.team-link span.hide-mobile').textContent};
		} else {
			records[dataIndex].record = dataRows[i].querySelectorAll('td')[0].textContent;
		}
	}


	return records;
}

function findStats (data) {
	let dom = new jsdom.JSDOM(data);

	let doc = dom.window.document;

	let dataRows = doc.querySelector('section.Card');

	return dataRows.textContent;
}


app.get('/fetch/standings', (req, res) => {
	axios.get('https://www.espn.com/mens-college-basketball/standings/_/group/7', {responseType: 'text'})
			.then(response => {
				res.send(findRecords(response.data));
			})
			.catch(e => console.error(e));
});

app.get('/fetch/stats', (req, res) => {
	axios.get('https://www.espn.com/mens-college-basketball/team/stats/_/id/130', {responseType: 'text'})
		.then(response => {
			res.send(findStats(response.data));
		})
		.catch(e => console.error(e));
});


app.get('/*', (req, res) => res.sendFile(__dirname + '/public/index.html'));

app.listen(PORT, HOST, (req, res) => console.log('node server is running'));