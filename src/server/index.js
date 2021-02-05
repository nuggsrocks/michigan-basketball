import 'core-js/stable';
import 'regenerator-runtime/runtime';

import express from 'express';
const app = express();

import cors from 'cors';
import axios from 'axios';
import {JSDOM} from 'jsdom';

import {findRecords} from './records';
import {findPlayerStats} from './player-stats';
import {findSchedule} from './schedule';
import {findRoster} from './roster';
import {scrapeTeamStats} from './team-stats';

const PORT = process.env.PORT || 8080;

const HOST = process.env.HOST || 'localhost';

app.use(cors());

app.use(express.static(__dirname + '/public'));

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get('/fetch/standings', (req, res) => {
	axios.get('https://www.espn.com/mens-college-basketball/standings/_/group/7', {responseType: 'text'})
			.then(response => {
				let doc = new JSDOM(response.data).window.document;
				res.send(findRecords(doc));

			})
			.catch(e => console.error(e));
});

app.get('/fetch/player-stats', (req, res) => {
	axios.get('https://www.espn.com/mens-college-basketball/team/stats/_/id/130', {responseType: 'text'})
		.then(response => {
			let doc = new JSDOM(response.data).window.document;
			res.send(findPlayerStats(doc));
		})
		.catch(e => console.error(e));
});

app.get('/fetch/schedule', (req, res) => {
	axios.get('https://www.espn.com/mens-college-basketball/team/schedule/_/id/130', {responseType: 'text'})
		.then(response => {
			let doc = new JSDOM(response.data).window.document;
			res.send(findSchedule(doc));
		})
		.catch(e => console.error(e));
});

app.get('/fetch/roster', (req, res) => {
	axios.get('https://www.espn.com/mens-college-basketball/team/roster/_/id/130', {responseType: 'text'})
		.then(response => {
			let doc = new JSDOM(response.data).window.document;
			res.send(findRoster(doc));
		})
});

app.get('/fetch/team-stats', (req, res) => {
	scrapeTeamStats().then(data => res.send(data));
});

app.get('/*', (req, res) => res.sendFile(__dirname + '/public/index.html'));

app.listen(PORT, HOST, () => console.log('node server is running'));