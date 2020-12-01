function findRoster (doc) {
    let table = doc.querySelector('div.ResponsiveTable.Team.Roster table');

    let rosterHeaders = [];

    let tableHeaders = table.querySelectorAll('thead tr th');

    for (let i = 0; i < tableHeaders.length; i++) {
        if (tableHeaders[i].textContent !== '') {
            rosterHeaders.push(tableHeaders[i].textContent);
        }
    }


    let rosterRows = [];

    let tableRows = table.querySelectorAll('tbody tr');

    for (let i = 1; i < tableRows.length; i++) {
        rosterRows.push(tableRows[i].querySelectorAll('td'));
    }

    rosterRows = rosterRows.filter(nodelist => nodelist[1].textContent.search(/[0-9]/) !== -1);



    let roster = [];

    for (let i = 0; i < rosterRows.length; i++) {
        let playerInfo = {};


        for (let j = 1; j < rosterRows[i].length; j++) {

            if (rosterHeaders[j - 1] === 'Name') {
                let nameAndNumString = rosterRows[i][j].textContent;

                let numberIndex = nameAndNumString.search(/[0-9]/);

                if (numberIndex !== -1) {
                    playerInfo['Number'] = '#' + nameAndNumString.substring(numberIndex);

                    playerInfo['Name'] = nameAndNumString.substring(0, numberIndex);

                }


            } else {
                playerInfo[rosterHeaders[j - 1]] = rosterRows[i][j].textContent;
            }

        }

        roster.push(playerInfo);
    }


    return roster;
}

export default findRoster;