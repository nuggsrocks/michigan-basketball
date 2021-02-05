import axios from 'axios';
import {JSDOM} from 'jsdom';
import {findSchedule} from './schedule';

export const scrapeTeamStats = async () => {
	try {
		let startTime = Date.now();

		let scheduleResponse = await axios.get('https://www.espn.com/mens-college-basketball/team/schedule/_/id/130', {
			responseType: 'text'
		});


		let doc = new JSDOM(scheduleResponse.data).window.document;

		let schedule = findSchedule(doc);

		let gameLinks = schedule.filter(game => game.link).map(game => game.link.replace('/game', '/boxscore'));

		let gameRequests = gameLinks.map(link => axios.get(link, {responseType: 'text'}));

		let gameResponses = await axios.all(gameRequests);

		let games = [];

		for (let res of gameResponses) {

			let doc = new JSDOM(res.data).window.document;

			let teams = doc.querySelectorAll('div.sub-module');

			const organizeStats = (teamDiv) => {
				let statsTableRow = teamDiv.querySelectorAll('table tbody tr.highlight')[0];

				let statColumns = statsTableRow.querySelectorAll('td');

				let fieldGoals = statColumns[2].textContent.split('-');

				let statObj = {};

				statObj.fgm = Number(fieldGoals[0]);
				statObj.fga = Number(fieldGoals[1]);

				let threes = statColumns[3].textContent.split('-');

				statObj['3pm'] = Number(threes[0]);
				statObj['3pa'] = Number(threes[1]);

				let freeThrows = statColumns[4].textContent.split('-');

				statObj['ftm'] = Number(freeThrows[0]);
				statObj['fta'] = Number(freeThrows[1]);

				statObj['oreb'] = Number(statColumns[5].textContent);

				statObj['dreb'] = Number(statColumns[6].textContent);

				statObj['reb'] = Number(statColumns[7].textContent);

				statObj['ast'] = Number(statColumns[8].textContent);

				statObj['stl'] = Number(statColumns[9].textContent);

				statObj['blk'] = Number(statColumns[10].textContent);

				statObj['to'] = Number(statColumns[11].textContent);

				statObj['pf'] = Number(statColumns[12].textContent);

				statObj['pts'] = Number(statColumns[13].textContent);



				return statObj;
			};

			let michiganIndex = teams[0].querySelector('div.team-name').textContent === 'Michigan' ? 0 : 1;

			let michigan = organizeStats(teams[michiganIndex]);

			let opponent = organizeStats(teams[michiganIndex === 0 ? 1 : 0]);

			games.push({michigan, opponent});
		}

		let endTime = Date.now();

		console.log(`The request took ${(endTime - startTime) / 1000} seconds to complete.`);

		return games;

	} catch(e) {
	    console.error(e);
	}
};