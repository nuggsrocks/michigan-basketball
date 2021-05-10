const axios = require('axios');

const {JSDOM} = require('jsdom');

const {findSchedule} = require('./schedule');

const fetchHtmlAsText = require('./functions/fetchHtmlAsText');

const constructVirtualDocument = async (url) => {
  try {
    let htmlData = await fetchHtmlAsText(url);

    return new JSDOM(htmlData).window.document;
  } catch(e) {
    console.error(e);
    return null;
  }
};

const scrapeStats = async () => {
  try {

    const schedulePageHtml = await fetchHtmlAsText(
        'https://www.espn.com/mens-college-basketball/team/schedule/_/id/130'
    ).then(html => html);

    const doc = new JSDOM(schedulePageHtml.data).window.document;

    const schedule = findSchedule(doc).filter((game) => game.link);

    const gameLinks = schedule.map((game) => {
      return game.link.replace('/game', '/boxscore');
    });

    const gameRequests = gameLinks.map((link) => {
      return axios.get(link, {responseType: 'text'});
    });

    const gameResponses = await Promise.all(gameRequests);

    const games = {michigan: [], opponent: []};

    for (const response of gameResponses) {
      const doc = new JSDOM(response.data).window.document;

      const teamDivs = doc.querySelectorAll('div.sub-module');


      const organizeStats = (teamDiv) => {
        const statsRows = teamDiv.querySelectorAll('table tbody tr');

        const playerStatRows = [];

        statsRows.forEach((row) => {
          if (!row.className.includes('highlight')) {
            playerStatRows.push(row);
          }
        });

        const playerStats = [];

        playerStatRows.forEach((row) => {
          const columns = row.querySelectorAll('td');

          const stats = {};

          columns.forEach((col) => {
            if (col.className.match(/(fg|3pt|ft)/)) {
              const made = col.className + 'm';
              const attempted = col.className + 'a';

              const statArray = col.textContent.split('-');

              stats[made] = statArray[0];
              stats[attempted] = statArray[1];
            } else {
              stats[col.className] = col.textContent;
            }
          });

          playerStats.push(stats);
        });


        return {playerStats};
      };

      const michiganIndex = teamDivs[0].querySelector('div.team-name')
          .textContent === 'Michigan' ? 0 : 1;

      const michigan = organizeStats(teamDivs[michiganIndex]);

      const opponent = organizeStats(teamDivs[michiganIndex === 0 ? 1 : 0]);

      games.michigan.push(michigan);
      games.opponent.push(opponent);
    }

    return games;
  } catch (e) {
    console.error(e);
  }
};

module.exports = {
  constructVirtualDocument,
  scrapeStats,
}
