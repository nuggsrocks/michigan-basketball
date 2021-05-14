const fetchHtmlAsText = require('./functions/fetchHtmlAsText')
const { JSDOM } = require('jsdom')

const findRoster = async (url) => {
  try {
    const doc = new JSDOM(await fetchHtmlAsText(url)).window.document

    const table = doc.querySelector('div.ResponsiveTable.Team.Roster table')

    const rosterHeaders = []

    const tableHeaders = table.querySelectorAll('thead tr th')

    for (let i = 0; i < tableHeaders.length; i++) {
      if (tableHeaders[i].textContent !== '') {
        rosterHeaders.push(tableHeaders[i].textContent)
      }
    }

    let rosterRows = []

    const tableRows = table.querySelectorAll('tbody tr')

    for (let i = 1; i < tableRows.length; i++) {
      rosterRows.push(tableRows[i].querySelectorAll('td'))
    }

    rosterRows = rosterRows.filter((nodelist) => {
      return nodelist[1].textContent.search(/[0-9]/) !== -1
    })

    const roster = []

    for (let i = 0; i < rosterRows.length; i++) {
      const playerInfo = {}

      for (let j = 1; j < rosterRows[i].length; j++) {
        if (rosterHeaders[j - 1] === 'Name') {
          const nameAndNumString = rosterRows[i][j].textContent

          const numberIndex = nameAndNumString.search(/[0-9]/)

          if (numberIndex !== -1) {
            playerInfo.Number = '#' +
                nameAndNumString.substring(numberIndex)

            playerInfo.Name = nameAndNumString.substring(0, numberIndex)
          }
        } else {
          playerInfo[rosterHeaders[j - 1]] = rosterRows[i][j].textContent
        }
      }

      roster.push(playerInfo)
    }

    return roster
  } catch (e) {
    console.error(e)
  }
}

module.exports = {
  findRoster
}
