const findSchedule = (doc) => {
    let tableRows = [...doc.querySelectorAll('div.page-container table tr')];

    let gameRows = tableRows.filter(tr => tr.textContent.indexOf('DATE') === -1 && tr.textContent.indexOf('Season') === -1)
        .map(row => row.querySelectorAll('td'));

    let schedule = [];

    gameRows.forEach(game => {
        let isCompleted = game[2].textContent[0].search(/([WL])/) !== -1;
        let opponent = game[1].textContent.replace(' *', '*').trimEnd();
        let result = isCompleted ? `${game[2].textContent[0]} ${game[2].textContent.slice(1).trimEnd()}` : game[2].textContent;
        let link = isCompleted && game[2].querySelector('a').href;

        schedule.push({date: game[0].textContent, opponent, result, link});
    })

    return schedule;
};

module.exports = {
    findSchedule
}