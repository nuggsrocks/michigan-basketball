import React from 'react';
import PropTypes from 'prop-types';

export const StatLeaders = (props) => {
  const {playerStats} = props;

  const displayStatLeaders = () => {
    const statCategories = playerStats.length > 0 ?
        Object.keys(playerStats[0].data) : [];

    statCategories.splice(statCategories.indexOf('FGM'), 2, 'FG%');

    statCategories.splice(statCategories.indexOf('FTM'), 2, 'FT%');

    statCategories.splice(statCategories.indexOf('3PM'), 2, '3P%');

    const statLeaders = {};

    statCategories.forEach((statName) => {
      const sortCallback = (a, b) => {
        let result;

        if (statName === 'GP') {
          result = b.data[statName] - a.data[statName];
        } else if (statName.search(/%/) !== -1) {
          const statMade = statName.replace('%', 'M');
          const statAtt = statName.replace('%', 'A');

          const getPercentage = (player) => {
            if (Number(player.data[statAtt]) === 0) {
              return 0;
            }

            return player.data[statMade] / player.data[statAtt];
          };


          result = getPercentage(b) - getPercentage(a);
        } else {
          result = (b.data[statName] / b.data['GP'])
              - (a.data[statName] / a.data['GP']);
        }

        return result;
      };

      const filterCallback = (player) => {
        if (statName.search(/%/) !== -1) {
          const statCategory = statName.replace('%', 'A');
          const statArr = playerStats.map((player) => {
            return player.data;
          }).map((data) => {
            return Number(data[statCategory]);
          });

          const max = Math.max(...statArr);

          return player.data[statCategory] > max / 3;
        } else {
          return player.data[statName] > 0;
        }
      };


      statLeaders[statName] = playerStats.sort(sortCallback)
          .filter(filterCallback).slice(0, 5)
          .map(({name, data}, index) => {
            let statValue;

            if (statName === 'GP') {
              statValue = data[statName];
            } else if (statName.search(/%/) !== -1) {
              const statMade = statName.replace('%', 'M');
              const statAtt = statName.replace('%', 'A');
              const percentage = data[statMade] / data[statAtt];
              statValue = `${Math.round(percentage * 1000) / 10}%`;
            } else {
              statValue = Math.round((data[statName] / data['GP']) * 10) / 10;
            }
            return <tr key={index}>
              <td>{name}</td>
              <td>{statValue}</td>
            </tr>;
          });
    });

    const statKeys = Object.keys(statLeaders);

    return statKeys.map((key, index) =>
      <section key={index}>
        <h3>{key}</h3>
        <table id='stat-leaders'>
          <tbody>
            {statLeaders[key]}
          </tbody>
        </table>
      </section>,
    );
  };


  return (
    <article>

      <h2>Stat Leaders</h2>

      {
        !playerStats && <div className='loadingIcon'/>
      }


      <article className='flex'>

        {
          playerStats && displayStatLeaders()
        }

      </article>
    </article>
  );
};


StatLeaders.propTypes = {
  playerStats: PropTypes.array.isRequired,
};
