function findSchedule (doc) {
    let tableRows = [...doc.querySelectorAll('div.page-container table tr')];

    let tableHeaders = [...tableRows[1].querySelectorAll('td')];

    let gameRows = tableRows.slice(2).map(row => row.querySelectorAll('td'));

    let schedule = [];

    gameRows.forEach(game => {
        let opponent = game[1].textContent.replace(' *', '*').trimEnd();
        let result = game[2].textContent[0].search(/(W|L)/) !== -1 ? `${game[2].textContent[0]} ${game[2].textContent.slice(1).trimEnd()}` : game[2].textContent;
        schedule.push({date: game[0].textContent, opponent, result});
    })

    return schedule;
}

export default findSchedule;