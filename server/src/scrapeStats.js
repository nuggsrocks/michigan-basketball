const { findSchedule } = require('./schedule')

const fetchHtmlAsText = require('./functions/fetchHtmlAsText')

const scrapeForPlayerStatsTableRows = require('./functions/scrapeForStatRows')

const organizePlayerStats = require('./functions/organizePlayerStats')

const scrapeStats = async () => {
  try {
    const scheduleUrl = 'https://www.espn.com/mens-college-basketball/team/schedule/_/id/130'

    const schedule = findSchedule(scheduleUrl).filter((game) => game.link)

    console.log()
    const gameLinks = schedule.map((game) => {
      return game.link.replace('/game', '/boxscore')
    })

    const boxScoreHtmlStrings = await fetchHtmlAsText(gameLinks)

    const games = { michigan: [], opponent: [] }
    const teamKeys = Object.keys(games)

    for (const htmlString of boxScoreHtmlStrings) {
      const playerStatRows = scrapeForPlayerStatsTableRows(htmlString)

      const playerStats = organizePlayerStats(playerStatRows)

      teamKeys.forEach((key) => games[key].push(playerStats[key]))
    }

    return games
  } catch (e) {
    console.error(e)
  }
}

module.exports = {
  scrapeStats
}
