const fetchHtmlAsText = require('./functions/fetchHtmlAsText');
const {JSDOM} = require('jsdom');

const findSchedule = async (url) => {
  try {
    const doc = new JSDOM(await fetchHtmlAsText(url)).window.document;

    const scheduleTable = doc.querySelector('table');

    const tableRows = scheduleTable.querySelectorAll('tr');

    const gameRows = [];

    tableRows.forEach((row) => {
      if (row.querySelectorAll('td').length > 1 &&
          !row.textContent.includes('DATE')) {
        gameRows.push(row);
      }
    });

    const schedule = [];

    gameRows.forEach((row) => {
      const columns = row.querySelectorAll('td');
      const isCompleted = columns[2].textContent[0].search(/([WL])/) !== -1;
      const opponent = columns[1].textContent.replace(' *', '*').trimEnd();
      const result = isCompleted ?
          columns[2].textContent[0] + ' ' +
          columns[2].textContent.slice(1).trimEnd() :
          columns[2].textContent;
      const link = isCompleted && columns[2].querySelector('a').href;

      schedule.push({date: columns[0].textContent, opponent, result, link});
    });

    return schedule;
  } catch (e) {
    console.error(e);
    return null;
  }
};

module.exports = {
  findSchedule,
};
