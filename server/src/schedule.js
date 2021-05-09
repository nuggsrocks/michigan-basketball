const findSchedule = (doc) => {
  let scheduleTable = doc.querySelector('table');

  const tableRows = scheduleTable.querySelectorAll('tr');

  let gameRows = [];

  tableRows.forEach(tr => {
    if (tr.className.includes('filled')) {
      gameRows.push(tr);
    }
  });

  const schedule = [];

  gameRows.forEach((row) => {
    let columns = row.querySelectorAll('td');
    const isCompleted = columns[2].textContent[0].search(/([WL])/) !== -1;
    const opponent = columns[1].textContent.replace(' *', '*').trimEnd();
    const result = isCompleted ?
        `${columns[2].textContent[0]} ${columns[2].textContent.slice(1).trimEnd()}` :
        columns[2].textContent;
    const link = isCompleted && columns[2].querySelector('a').href;

    schedule.push({date: columns[0].textContent, opponent, result, link});
  });

  console.log(schedule);
  return schedule;
};

module.exports = {
  findSchedule,
};
