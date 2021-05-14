const { JSDOM } = require('jsdom')

const findRoster = (htmlString) => {
  const doc = new JSDOM(htmlString).window.document

  const table = doc.querySelector('table')

  const rosterHeaders = []

  const tableHeaders = table.querySelectorAll('thead tr th')

  for (let i = 0; i < tableHeaders.length; i++) {
    if (tableHeaders[i].textContent !== '') {
      rosterHeaders.push(tableHeaders[i].textContent)
    }
  }

  const rosterRows = []

  const tableRows = table.querySelectorAll('tbody tr')

  for (const row of tableRows) {
    rosterRows.push(row.querySelectorAll('td'))
  }

  const roster = []

  for (const row of rosterRows) {
    const playerInfo = {}

    for (let j = 1; j < row.length; j++) {
      if (rosterHeaders[j - 1] === 'Name') {
        playerInfo.name = row[j].querySelector('a').textContent

        playerInfo.number = row[j].querySelector('span').textContent
      } else {
        playerInfo[rosterHeaders[j - 1].toLowerCase()] = row[j].textContent
      }
    }

    roster.push(playerInfo)
  }

  return roster
}

module.exports = {
  findRoster
}
