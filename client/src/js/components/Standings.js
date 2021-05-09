import React from 'react';
import PropTypes from 'prop-types';

export const Standings = (props) => {
  const {standings} = props;

  const calcWinningPercentage = (team) => {
    return team.record.conference.split('-')[0] /
        team.record.conference.split('-').reduce((a, b) => {
          return Number(a) + Number(b)
        });
  };

  return (
    <article>

      <h2>Big Ten Standings</h2>

      {
        !standings && <div className='loadingIcon'/>
      }

      <section>
        {
          standings &&
          <table className='end-column'>
            <tbody>
            {
              standings.sort((a, b) =>
                  calcWinningPercentage(b) - calcWinningPercentage(a)
              ).map(({name, record}, index) => {
                    return <tr key={index}>
                      <th>{index + 1}</th>
                      <td>{name}</td>
                      <td>{`${record.conference} (${record.overall})`}</td>
                    </tr>;
                  },
              )
            }
            </tbody>
          </table>
        }
      </section>

    </article>
  );
};

Standings.propTypes = {
  standings: PropTypes.array.isRequired,
};
