import React from 'react';
import PropTypes from 'prop-types';

export const PlayerStats = (props) => {
  const {playerStats} = props;

  let headers;

  if (playerStats) {
    headers = playerStats ? [
      'Name',
      'Position',
      ...Object.keys(playerStats[0].data),
    ] : [];
  }

  return <section>
    <h2>Player Stats</h2>

    {
      !playerStats &&
      <div className='loadingIcon'/>
    }

    {
      playerStats &&
      <table>
        <thead>
        <tr>
          {
            headers.map((key, index) =>
                <th key={index} onClick={() => props.sortStats(key)}>{key}</th>,
            )
          }
        </tr>
        </thead>
        <tbody>
        {
          playerStats.map(({name, position, data}, index) =>
              <tr key={index}>
                <td>{name}</td>
                <td>{position}</td>
                {
                  Object.values(data).map((stat, index) =>
                      <td key={index}>{stat}</td>,
                  )
                }
              </tr>,
          )
        }
        </tbody>
      </table>
    }

  </section>;
};

PlayerStats.propTypes = {
  playerStats: PropTypes.array.isRequired,
  sortStats: PropTypes.func.isRequired
};
