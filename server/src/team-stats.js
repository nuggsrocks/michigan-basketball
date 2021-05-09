const axios = require('axios');
const {JSDOM} = require('jsdom');
const {findSchedule} = require('./schedule');

const scrapeTeamStats = async () => {
  try {
    const scheduleResponse = await axios.get('https://www.espn.com/mens-college-basketball/team/schedule/_/id/130', {
      responseType: 'text',
    });


    const doc = new JSDOM(scheduleResponse.data).window.document;

    const schedule = findSchedule(doc).filter((game) => game.link);

    const gameLinks = schedule.map((game) => {
      return game.link.replace('/game', '/boxscore');
    });

    const gameRequests = gameLinks.map((link) => {
      return axios.get(link, {responseType: 'text'});
    });

    const gameResponses = await Promise.all(gameRequests);

    const games = [];

    for (const response of gameResponses) {
      const doc = new JSDOM(response.data).window.document;

      const teams = doc.querySelectorAll('div.sub-module');

      const organizeStats = (teamDiv) => {
        const statsTableRow = teamDiv
            .querySelectorAll('table tbody tr.highlight')[0];

        const statColumns = statsTableRow.querySelectorAll('td');

        const fieldGoals = statColumns[2].textContent.split('-');

        const statObj = {};

        statObj.fgm = Number(fieldGoals[0]);
        statObj.fga = Number(fieldGoals[1]);
        statObj['fg%'] = Number(fieldGoals[0]) * 100 / Number(fieldGoals[1]);
        statObj['fg%'] = Math.round(statObj['fg%'] * 100) / 100;

        const threes = statColumns[3].textContent.split('-');

        statObj['3pm'] = Number(threes[0]);
        statObj['3pa'] = Number(threes[1]);
        statObj['3p%'] = Number(threes[0]) * 100 / Number(threes[1]);
        statObj['3p%'] = Math.round(statObj['3p%'] * 100) / 100;

        const freeThrows = statColumns[4].textContent.split('-');

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

        const date = schedule[i]['date'].split(', ')[1];

        statObj['gameInfo'] = date + ' ' + schedule[i]['opponent'];

        return statObj;
      };

      const michiganIndex = teams[0].querySelector('div.team-name')
          .textContent === 'Michigan' ? 0 : 1;

      const michigan = organizeStats(teams[michiganIndex]);

      const opponent = organizeStats(teams[michiganIndex === 0 ? 1 : 0]);

      games.push({michigan, opponent});
    }

    const statKeys = Object.keys(games[0]['michigan']);

    const calcSeasonTotals = () => {
      const totals = {
        michigan: {},
        opponent: {},
      };

      const teams = Object.keys(totals);

      statKeys.filter((key) => key !== 'gameInfo')
          .forEach((key) => {
            if (key.includes('%')) {
              teams.forEach((team) => {
                const basketsMade = games.map((game) => {
                  return game[team][key.replace('%', 'm')];
                }).reduce((a, b) => a + b);
                const basketsAttempted = games.map((game) => {
                  return game[team][key.replace('%', 'a')];
                }).reduce((a, b) => a + b);

                totals[team][key] = Math.round(
                    basketsMade * 10000 / basketsAttempted,
                ) / 100;
              });
            } else {
              teams.forEach((team) => {
                totals[team][key] = games.map((game) => {
                  return game[team][key];
                }).reduce((a, b) => a + b);
              });
            }
          });

      return totals;
    };


    const seasonTotals = calcSeasonTotals();

    const calcSeasonStatMargins = () => {
      const margins = {};

      statKeys.filter((key) => key !== 'gameInfo' && !key.includes('%'))
          .forEach((key) => {
            let margin = seasonTotals['michigan'][key] -
                seasonTotals['opponent'][key];

            if (key === 'to') {
              // turnover margins are usually represented with the opposite sign
              margin *= -1;
            }

            margins[key] = `${margin > 0 ? '+' : ''}${margin}`;
          });

      return margins;
    };

    const statMargins = calcSeasonStatMargins();

    const calcSeasonHighsAndLows = () => {
      const createTeamObj = () => {
        return {
          seasonHighs: {},
          seasonLows: {},
        };
      };

      const result = {
        michigan: createTeamObj(),
        opponent: createTeamObj(),
      };

      statKeys.filter((key) => key !== 'gameInfo')
          .forEach((key) => {
            Object.keys(result).forEach((team) => {
              let seasonHigh; let seasonLow;
              games.forEach((game) => {
                const gameInfo = game[team]['gameInfo'];
                const statValue = game[team][key];
                if (!seasonHigh || !seasonLow) {
                  seasonHigh = {
                    value: statValue,
                    info: gameInfo,
                  };
                  seasonLow = {
                    value: statValue,
                    info: gameInfo,
                  };
                } else {
                  if (statValue > seasonHigh.value) {
                    seasonHigh = {
                      value: statValue,
                      info: gameInfo,
                    };
                  } else if (statValue === seasonHigh.value) {
                    seasonHigh.info += ', ' + gameInfo;
                  }

                  if (statValue < seasonLow.value) {
                    seasonLow = {
                      value: statValue,
                      info: gameInfo,
                    };
                  } else if (statValue === seasonLow.value) {
                    seasonLow.info += ', ' + gameInfo;
                  }
                }
              });

              result[team].seasonHighs[key] = `
                ${seasonHigh.value} (${seasonHigh.info})
              `;
              result[team].seasonLows[key] = `
                ${seasonLow.value} (${seasonLow.info})
              `;
            });
          });

      return result;
    };

    const seasonHighsAndLows = calcSeasonHighsAndLows();

    return {games, seasonTotals, statMargins, seasonHighsAndLows};
  } catch (e) {
    console.error(e);
  }
};

module.exports = {
  scrapeTeamStats,
};
