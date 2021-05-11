const {window} = require('jsdom');

const scrapeForPlayerStatsTableRows = () => {
  const fakeData = {michigan: [], opponent: []};
  const fakeStats = {
    pts: 10,
    reb: 5,
    fg: '1-2',
  };

  const teamKeys = Object.keys(fakeData);
  const statKeys = Object.keys(fakeStats);

  teamKeys.forEach((teamKey) => {
    const row = new window.HTMLTableRowElement();

    statKeys.forEach((statKey) => {
      const cell = row.insertCell();

      cell.className = statKey;

      cell.append(fakeStats[statKey]);
    });

    fakeData[teamKey].push(row);
  });
};

module.exports = scrapeForPlayerStatsTableRows;
