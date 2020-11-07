const express = require('express');
const app = express();

const cors = require('cors');
const axios = require('axios');
const jsdom = require('jsdom');

const PORT = process.env.PORT || 8080;

const HOST = process.env.HOST || 'localhost';

app.use(cors());

app.use(express.static(__dirname + '/public'));

function constructJsdomDocument (data) {
	let dom = new jsdom.JSDOM(data);

	return dom.window.document;
}

function findRecords (doc) {

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

function findStats (doc) {
	let tableRows = doc.querySelectorAll('section.Card div.mt5 table tbody tr');

	let tableData = [];

	tableRows.forEach(element => tableData.push(element.textContent));

	let tableHeaders = doc.querySelectorAll('section.Card div.mt5 table thead tr th');

	let statHeaders = [];


	for (let i = 0; i < tableHeaders.length; i++) {
		statHeaders.push(tableHeaders[i].textContent);
	}


	statHeaders = [statHeaders[1], ...statHeaders.slice(statHeaders.lastIndexOf('Name') + 1)];

	let stats = [];

	

	for (let i = 0; i < tableData.length; i++) {

		let numOfPlayers = tableData.findIndex(text => text === 'Total');

		if (i < numOfPlayers) {

			let name = tableData[i].split(' ').filter((data, index) => index < 2).join(' ');

			let position = tableData[i].split(' ').filter(data => data.length === 1)[0];

			stats.push({name, position});

		} else if (i < numOfPlayers * 2) {

			let playerStatColumns = [
				tableRows[i + 1].querySelectorAll('td')[0]
			];

			tableRows[i + (numOfPlayers * 2) + 3].querySelectorAll('td').forEach(column => playerStatColumns.push(column));


			let playerStats = {};
			
			for (let j = 0; j < playerStatColumns.length; j++) {
				playerStats[statHeaders[j]] = playerStatColumns[j].textContent;
			}

			stats[i - numOfPlayers].data = playerStats;

		}
	}

	return stats;
}

function findSchedule (doc) {
	let tableRows = [...doc.querySelectorAll('div.page-container table tr')];

	let tableHeaders = [...tableRows[1].querySelectorAll('td')];

	let gameRows = tableRows.slice(2).map(row => row.querySelectorAll('td'));

	let schedule = [];

	gameRows.forEach(game => {
		let opponent = game[1].textContent.replace(' *', '*').trimEnd();
		let result = game[2].textContent[0].search(/(W|L)/) !== -1 ? `${game[2].textContent[0]} ${game[2].textContent.slice(1).trimEnd()}` : game[2].textContent;
		schedule.push({date: game[0].textContent, opponent, result});
	})

	return schedule;
}

function findRoster (doc) {
	let table = doc.querySelector('div.ResponsiveTable.Team.Roster table');

	let rosterHeaders = [];

	let tableHeaders = table.querySelectorAll('thead tr th');

	for (let i = 0; i < tableHeaders.length; i++) {
		if (tableHeaders[i].textContent !== '') {
			rosterHeaders.push(tableHeaders[i].textContent);
		}
	}


	let rosterRows = [];

	let tableRows = table.querySelectorAll('tbody tr');

	for (let i = 1; i < tableRows.length; i++) {
		rosterRows.push(tableRows[i].querySelectorAll('td'));
	}



	let roster = [];

	for (let i = 0; i < rosterRows.length; i++) {
		let playerInfo = {};


		for (let j = 1; j < rosterRows[i].length; j++) {
			
			playerInfo[rosterHeaders[j - 1]] = rosterRows[i][j].textContent;
			
		}

		roster.push(playerInfo);
	}


	return roster;
}


app.get('/fetch/standings', (req, res) => {
	axios.get('https://www.espn.com/mens-college-basketball/standings/_/group/7', {responseType: 'text'})
			.then(response => {
				let doc = constructJsdomDocument(response.data);
				res.send(findRecords(doc));

			})
			.catch(e => console.error(e));
});

app.get('/fetch/stats', (req, res) => {
	axios.get('https://www.espn.com/mens-college-basketball/team/stats/_/id/130', {responseType: 'text'})
		.then(response => {
			let doc = constructJsdomDocument(response.data);
			res.send(findStats(doc));
		})
		.catch(e => console.error(e));
});

app.get('/fetch/schedule', (req, res) => {
	axios.get('https://www.espn.com/mens-college-basketball/team/schedule/_/id/130/season/2020', {responseType: 'text'})
		.then(response => {
			let doc = constructJsdomDocument(response.data);
			res.send(findSchedule(doc));
		})
		.catch(e => console.error(e));
});

app.get('/fetch/roster', (req, res) => {
	axios.get('https://www.espn.com/mens-college-basketball/team/roster/_/id/130', {responseType: 'text'})
		.then(response => {
			let doc = constructJsdomDocument(response.data);
			res.send(findRoster(doc));
		})
});


app.get('/*', (req, res) => res.sendFile(__dirname + '/public/index.html'));

app.listen(PORT, HOST, (req, res) => console.log('node server is running'));