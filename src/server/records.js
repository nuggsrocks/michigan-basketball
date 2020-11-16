function findRecords (doc) {

    let tableRows = doc.querySelectorAll('div.standings__table table tbody tr');

    let records = [];

    for (let i = 0; i < tableRows.length; i++) {
        let dataIndex = tableRows[i].attributes['data-idx'].value;

        if (i < 14) {
            records[dataIndex] = {name: tableRows[i].querySelector('div.team-link span.hide-mobile').textContent};
        } else {
            records[dataIndex].record = tableRows[i].querySelectorAll('td')[0].textContent;
        }
    }


    return records;
}

export default findRecords;