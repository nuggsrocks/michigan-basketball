export const getStatLeaders = async () => {
    try {
        const {default: React} = await import('react');

        return (props) => {
            let stats = props.data.stats;

            const displayStatLeaders = () => {
                let statCategories = stats.length > 0 ? Object.keys(stats[0].data) : [];

                statCategories.splice(statCategories.indexOf('FGM'), 2, 'FG%');

                statCategories.splice(statCategories.indexOf('FTM'), 2, 'FT%');

                statCategories.splice(statCategories.indexOf('3PM'), 2, '3P%');

                let statLeaders = {};

                statCategories.forEach((statName) => {

                    const sortCallback = (a, b) => {
                        let result;

                        if (statName === 'GP') {
                            result =  b.data[statName] - a.data[statName];
                        } else if (statName.search(/%/) !== -1) {
                            let statMade = statName.replace('%', 'M');
                            let statAtt = statName.replace('%', 'A');

                            const getPercentage = (player) => {
                                if (Number(player.data[statAtt]) === 0) {
                                    return 0;
                                }

                                return player.data[statMade] / player.data[statAtt];
                            };


                            result = getPercentage(b) - getPercentage(a);
                        } else {
                            result = (b.data[statName] / b.data['GP']) - (a.data[statName] / a.data['GP']);
                        }

                        return result;
                    };

                    const filterCallback = (player) => {
                        if (statName.search(/%/) !== -1) {
                            return player.data[statName.replace('%', 'A')] > 0;
                        } else {

                            return player.data[statName] > 0;
                        }
                    };




                    statLeaders[statName] = stats.sort(sortCallback)
                        .filter(filterCallback).slice(0, 5)
                        .map(({name, data}, index) => {
                            let statValue;

                            if (statName === 'GP') {
                                statValue = Math.round(data[statName] * 10) / 10;
                            } else if (statName.search(/%/) !== -1) {
                                let statMade = statName.replace('%', 'M');
                                let statAtt = statName.replace('%', 'A');
                                let percentage = data[statMade] / data[statAtt];
                                statValue = `${Math.round(percentage * 1000) / 10}%`;
                            } else {
                                statValue = Math.round((data[statName] / data['GP']) * 10) / 10;
                            }
                            return <tr key={index}>
                                <td>{name}</td>
                                <td>{statValue}</td>
                            </tr>
                        });
                });

                let statKeys = Object.keys(statLeaders);

                return statKeys.map((key, index) =>
                    <section key={index}>
                        <h3>{key}</h3>
                        <table className='schedulePage'>
                            <tbody>
                            {statLeaders[key]}
                            </tbody>
                        </table>
                    </section>
                )
            };


            return (
                <article>

                    <h2>Stat Leaders</h2>

                    {
                        stats.length === 0 && <div className='loadingIcon'/>
                    }

                    {
                        stats.length > 0 && displayStatLeaders()
                    }
                </article>
            )
        }
    } catch(e) {
        console.error(e);
    }
};