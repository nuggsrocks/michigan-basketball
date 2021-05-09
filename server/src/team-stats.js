const axios = require('axios');
const {JSDOM} = require('jsdom');
const {findSchedule} = require('./schedule');

const scrapeTeamStats = async () => {
	try {

		let scheduleResponse = await axios.get('https://www.espn.com/mens-college-basketball/team/schedule/_/id/130', {
			responseType: 'text'
		});


		let doc = new JSDOM(scheduleResponse.data).window.document;

		let schedule = findSchedule(doc).filter(game => game.link);

		let gameLinks = schedule.map(game => game.link.replace('/game', '/boxscore'));

		let gameRequests = gameLinks.map(link => axios.get(link, {responseType: 'text'}));

		let gameResponses = await Promise.all(gameRequests);

		let games = [];

		for (let i in gameResponses) {

			let doc = new JSDOM(gameResponses[i].data).window.document;

			let teams = doc.querySelectorAll('div.sub-module');

			const organizeStats = (teamDiv) => {
				let statsTableRow = teamDiv.querySelectorAll('table tbody tr.highlight')[0];

				let statColumns = statsTableRow.querySelectorAll('td');

				let fieldGoals = statColumns[2].textContent.split('-');

				let statObj = {};

				statObj.fgm = Number(fieldGoals[0]);
				statObj.fga = Number(fieldGoals[1]);
				statObj['fg%'] = Number(fieldGoals[0]) * 100 / Number(fieldGoals[1]);
				statObj['fg%'] = Math.round(statObj['fg%'] * 100) / 100;

				let threes = statColumns[3].textContent.split('-');

				statObj['3pm'] = Number(threes[0]);
				statObj['3pa'] = Number(threes[1]);
				statObj['3p%'] = Number(threes[0]) * 100 / Number(threes[1]);
				statObj['3p%'] = Math.round(statObj['3p%'] * 100) / 100;

				let freeThrows = statColumns[4].textContent.split('-');

				statObj['ftm'] = Number(freeThrows[0]);
				statObj['fta'] = Number(freeThrows[1]);
				statObj['ft%'] = Number(freeThrows[0]) * 100 / Number(freeThrows[1]);
				statObj['ft%'] = Math.round(statObj['ft%'] * 100) / 100;

				statObj['oreb'] = Number(statColumns[5].textContent);

				statObj['dreb'] = Number(statColumns[6].textContent);

				statObj['reb'] = Number(statColumns[7].textContent);

				statObj['ast'] = Number(statColumns[8].textContent);

				statObj['stl'] = Number(statColumns[9].textContent);

				statObj['blk'] = Number(statColumns[10].textContent);

				statObj['to'] = Number(statColumns[11].textContent);

				statObj['pf'] = Number(statColumns[12].textContent);

				statObj['pts'] = Number(statColumns[13].textContent);

				let date = schedule[i]['date'].split(', ')[1];

				statObj['gameInfo'] = date + ' ' + schedule[i]['opponent'];

				return statObj;
			};

			let michiganIndex = teams[0].querySelector('div.team-name').textContent === 'Michigan' ? 0 : 1;

			let michigan = organizeStats(teams[michiganIndex]);

			let opponent = organizeStats(teams[michiganIndex === 0 ? 1 : 0]);

			games.push({michigan, opponent});
		}

		let statKeys = Object.keys(games[0]['michigan']);

		const calcSeasonTotals = () => {
			let totals = {
				michigan: {},
				opponent: {}
			};

			let teams = Object.keys(totals);

			statKeys.filter(key => key !== 'gameInfo')
				.forEach(key => {
					if (key.includes('%')) {
						teams.forEach(team => {
							let basketsMade = games.map(game => game[team][key.replace('%', 'm')])
								.reduce((a, b) => a + b);
							let basketsAttempted = games.map(game => game[team][key.replace('%', 'a')])
								.reduce((a, b) => a + b);

							totals[team][key] = Math.round(basketsMade * 10000 / basketsAttempted) / 100;
						});
					} else {
						teams.forEach(team => {
							totals[team][key] = games.map(game => game[team][key]).reduce((a, b) => a + b);
						});
					}
				});

			return totals;
		};


		let seasonTotals = calcSeasonTotals();

		const calcSeasonStatMargins = () => {
			let margins = {};

			statKeys.filter(key => key !== 'gameInfo' && !key.includes('%'))
				.forEach(key => {
					let margin;

					if (key === 'to') {
						// turnover margins are usually represented with the opposite sign
						margin = (seasonTotals['michigan'][key] - seasonTotals['opponent'][key]) * -1;
					} else {
						margin = seasonTotals['michigan'][key] - seasonTotals['opponent'][key];
					}

					margins[key] = `${margin > 0 ? '+' : ''}${margin}`

				});

			return margins;
		};

		let statMargins = calcSeasonStatMargins();

		const calcSeasonHighsAndLows = () => {
			const createTeamObj = () => {
				return {
					seasonHighs: {},
					seasonLows: {}
				};
			};

			let result = {
				michigan: createTeamObj(),
				opponent: createTeamObj()
			};

			statKeys.filter(key => key !== 'gameInfo')
				.forEach(key => {

					Object.keys(result).forEach(team => {
						let seasonHigh, seasonLow;
						games.forEach(game => {

							let gameInfo = game[team]['gameInfo'];
							let statValue = game[team][key];
							if (!seasonHigh || !seasonLow) {
								seasonHigh = {
									value: statValue,
									info: gameInfo
								};
								seasonLow = {
									value: statValue,
									info: gameInfo
								};
							} else {
								if (statValue > seasonHigh.value) {
									seasonHigh = {
										value: statValue,
										info: gameInfo
									};
								} else if (statValue === seasonHigh.value) {
									seasonHigh.info += ', ' + gameInfo;
								}

								if (statValue < seasonLow.value) {
									seasonLow = {
										value: statValue,
										info: gameInfo
									};
								} else if (statValue === seasonLow.value) {
									seasonLow.info += ', ' + gameInfo;
								}
							}
						});

						result[team].seasonHighs[key] = `${seasonHigh.value} (${seasonHigh.info})`;
						result[team].seasonLows[key] = `${seasonLow.value} (${seasonLow.info})`;


					});
				});

			return result;
		};

		let seasonHighsAndLows = calcSeasonHighsAndLows();

		return {games, seasonTotals, statMargins, seasonHighsAndLows};

	} catch(e) {
	    console.error(e);
	}
};

module.exports = {
	scrapeTeamStats
}