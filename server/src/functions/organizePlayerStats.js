const { JSDOM } = require('jsdom')

const organizePlayerStats = (htmlData) => {
  const document = new JSDOM(htmlData).window.document

  const teamDivs = document.querySelectorAll('div.sub-module')

  const playerStatRows = {}

  let i = 0

  while (i < teamDivs.length) {
    let teamName = teamDivs[i].querySelector('div.team-name').textContent

    if (teamName.match(/michigan/i)) {
      teamName = 'michigan'
    } else {
      teamName = 'opponent'
    }
    let statsRows = teamDivs[i].querySelectorAll('table tbody tr')

    statsRows = [...statsRows].filter((row) => !row.className.match(/highlight/))

    playerStatRows[teamName] = statsRows

    i++
  }

  const stats = {
    michigan: [],
    opponent: []
  }

  for (const teamKey in stats) {
    playerStatRows[teamKey].forEach(row => {
      const columns = row.querySelectorAll('td')

      const playerStats = {}

      columns.forEach(col => {
        if (col.className.match(/name/)) {
          playerStats.name = col.querySelector('span.abbr').textContent
        } else if (col.className.match(/fg|3pt|ft/)) {
          const made = col.className + 'm'
          const attempted = col.className + 'a'

          const statValues = col.textContent.split('-')

          playerStats[made] = Number(statValues[0])
          playerStats[attempted] = Number(statValues[1])
        } else {
          playerStats[col.className] = Number(col.textContent)
        }
      })

      stats[teamKey].push(playerStats)
    })
  }
  return stats
}

module.exports = organizePlayerStats
