function findStats (doc) {
    let tableRows = doc.querySelectorAll('section.Card div.mt5 table tbody tr');

    let tableData = [];

    tableRows.forEach(element => tableData.push(element.textContent));

    let tableHeaders = doc.querySelectorAll('section.Card div.mt5 table thead tr th');

    let statHeaders = [];


    for (let i = 0; i < tableHeaders.length; i++) {
        statHeaders.push(tableHeaders[i].textContent);
    }


    statHeaders = [statHeaders[1], ...statHeaders.slice(statHeaders.lastIndexOf('Name') + 1)];

    let stats = [];



    for (let i = 0; i < tableData.length; i++) {

        let numOfPlayers = tableData.findIndex(text => text === 'Total');

        if (i < numOfPlayers) {

            let name = tableData[i].split(' ').filter((data, index) => index < 2).join(' ');

            let position = tableData[i].split(' ').filter(data => data.length === 1)[0];

            stats.push({name, position});

        } else if (i < numOfPlayers * 2) {

            let playerStatColumns = [
                tableRows[i + 1].querySelectorAll('td')[0]
            ];

            tableRows[i + (numOfPlayers * 2) + 3].querySelectorAll('td').forEach(column => playerStatColumns.push(column));


            let playerStats = {};

            for (let j = 0; j < playerStatColumns.length; j++) {
                playerStats[statHeaders[j]] = playerStatColumns[j].textContent;
            }

            stats[i - numOfPlayers].data = playerStats;

        }
    }

    return stats;
}

export default findStats;