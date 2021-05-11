const organizePlayerStats = (playerStatRows) => {
  const playerStats = {};

  const teamKeys = Object.keys(playerStatRows);

  teamKeys.forEach((teamKey) => {
    const columns = playerStatRows[teamKey].querySelectorAll('td');

    const stats = {};

    columns.forEach((col) => {
      if (col.className.match(/(fg|3pt|ft)/)) {
        const made = col.className + 'm';
        const attempted = col.className + 'a';

        const statArray = col.textContent.split('-');

        stats[made] = statArray[0];
        stats[attempted] = statArray[1];
      } else {
        stats[col.className] = col.textContent;
      }
    });

    playerStats[teamKey] = stats;
  });
  return playerStats;
};

module.exports = organizePlayerStats;
