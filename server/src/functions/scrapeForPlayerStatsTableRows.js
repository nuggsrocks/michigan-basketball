const {JSDOM} = require('jsdom');

const scrapeForPlayerStatsTableRows = (htmlData) => {
  const document = new JSDOM(htmlData).window.document;

  const teamDivs = document.querySelectorAll('div.sub-module');

  const playerStatRows = {};

  let i = 0;

  while (i < teamDivs.length) {
    let teamName = teamDivs[i].querySelector('div.team-name').textContent;

    if (teamName.match(/michigan/i)) {
      teamName = 'michigan';
    } else {
      teamName = 'opponent';
    }
    let statsRows = teamDivs[i].querySelectorAll('table tbody tr');

    statsRows = [...statsRows].filter((row) => !row.className.match(/highlight/));

    playerStatRows[teamName] = statsRows;

    i++;
  }

  return playerStatRows;
};

module.exports = scrapeForPlayerStatsTableRows;
