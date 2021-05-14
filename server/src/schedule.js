const { JSDOM } = require('jsdom')

const findSchedule = (htmlString) => {
  const doc = new JSDOM(htmlString).window.document

  const scheduleTable = doc.querySelector('table')

  const tableRows = scheduleTable.querySelectorAll('tr')

  const gameRows = []

  tableRows.forEach((row) => {
    if (row.querySelectorAll('td').length > 1 &&
        !row.textContent.match(/date/i)) {
      gameRows.push(row)
    }
  })

  const schedule = []

  gameRows.forEach((row) => {
    const columns = row.querySelectorAll('td')
    const resultString = columns[2].textContent

    const result = resultString.split(' ').filter(string => string !== '').join(' ')

    const isCompleted = columns[2].textContent[0].match(/[WL]/)

    const link = isCompleted ? columns[2].querySelector('a').href : null

    const opponent = columns[1].textContent.replace(' *', '*').trimEnd()

    schedule.push({ date: columns[0].textContent, opponent, result, link })
  })
  return schedule
}

module.exports = {
  findSchedule
}
