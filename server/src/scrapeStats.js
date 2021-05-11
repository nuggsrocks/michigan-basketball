const {JSDOM} = require('jsdom');

const {findSchedule} = require('./schedule');

const fetchHtmlAsText = require('./functions/fetchHtmlAsText');

const scrapeForPlayerStatsTableRows = require('./functions/scrapeForPlayerStatsTableRows');

const organizePlayerStats = require('./functions/organizePlayerStats');

const scrapeStats = async () => {
  try {
    const scheduleUrl = 'https://www.espn.com/mens-college-basketball/team/schedule/_/id/130';
    const schedulePageHtml = await fetchHtmlAsText(scheduleUrl)
        .then((html) => html);

    const doc = new JSDOM(schedulePageHtml).window.document;

    const schedule = findSchedule(doc).filter((game) => game.link);


    const gameLinks = schedule.map((game) => {
      return game.link.replace('/game', '/boxscore');
    });

    const boxScoreHtmlStrings = await fetchHtmlAsText(gameLinks);

    const games = {michigan: [], opponent: []};
    const teamKeys = Object.keys(games);

    for (const htmlString of boxScoreHtmlStrings) {
      const playerStatRows = scrapeForPlayerStatsTableRows(htmlString);

      const playerStats = organizePlayerStats(playerStatRows);

      teamKeys.forEach((key) => games[key].push(playerStats[key]));
    }

    return games;
  } catch (e) {
    console.error(e);
  }
};

module.exports = {
  scrapeStats,
};
