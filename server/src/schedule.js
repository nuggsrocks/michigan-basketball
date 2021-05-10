const findSchedule = (doc) => {
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
};

module.exports = {
  findSchedule,
};
