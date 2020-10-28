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

	let tableRows = doc.querySelectorAll('div.standings__table table tbody tr');

	let records = [];

	for (let i = 0; i < tableRows.length; i++) {
		let dataIndex = tableRows[i].attributes['data-idx'].value;

		if (i < 14) {
			records[dataIndex] = {name: tableRows[i].querySelector('div.team-link span.hide-mobile').textContent};
		} else {
			records[dataIndex].record = tableRows[i].querySelectorAll('td')[0].textContent;
		}
	}


	return records;
}

function findStats (data) {
	let dom = new jsdom.JSDOM(data);

	let doc = dom.window.document;

	let tableRows = doc.querySelectorAll('section.Card div.mt5 table tbody tr');

	let tableData = [];

	tableRows.forEach(element => tableData.push(element.textContent));

	let tableHeaders = doc.querySelectorAll('section.Card div.mt5 table thead tr th');

	let statHeaders = [];

	for (let i = 1; i < (tableHeaders.length / 2) - 2; i++) {
		statHeaders.push(tableHeaders[i].textContent);
	}

	let stats = [];

	for (let i in tableData) {
		let numOfPlayers = tableData.findIndex(text => text === 'Total');
		
		
		if (i < numOfPlayers) {

			let name = tableData[i].split(' ').filter((data, index) => index < 2).join(' ');

			let position = tableData[i].split(' ').filter(data => data.length === 1)[0];

			stats.push({name, position});

		} else if (i > numOfPlayers && i < (numOfPlayers * 2) + 1) {
			let index = i - numOfPlayers - 1;
			let playerStatColumns = tableRows[i].querySelectorAll('td');


			
			let playerStats = {};
			
			for (let i = 0; i < playerStatColumns.length; i++) {

				playerStats[statHeaders[i]] = playerStatColumns[i].textContent;
				
			};



			stats[index].data = playerStats;
		}
	}

	return stats;
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