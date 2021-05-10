import React from 'react';
import PropTypes from 'prop-types';

export const Schedule = (props) => {
  const {standings, schedule} = props.data;

  if (!standings && !schedule) {
    props.fetchInfo(['standings', 'schedule']);
  }

  let michiganTeamObj, michRecord;

  if (standings) {
    michiganTeamObj = standings.find((team) => {
      return team.name === 'Michigan Wolverines';
    });
    michRecord = {
      conference: michiganTeamObj.record.conference,
      overall: michiganTeamObj.record.overall,
    };
  }

  return (
    <article>
      <section>
        <h1>Schedule</h1>

        {
          !schedule &&
          <div className='loadingIcon'/>
        }

        {
          schedule &&
          <section>
            <h2>
              {`${michRecord.overall} (${michRecord.conference} Big Ten)`}
            </h2>
            <table>
              <thead>
              <tr>
                {
                  Object.keys(schedule[0]).map((key, index) => {
                    if (key !== 'link') {
                      return <th key={index}>
                        {key[0].toUpperCase() + key.slice(1)}
                      </th>
                    }
                  })
                }
              </tr>
              </thead>
              <tbody>
              {
                schedule.map(({date, opponent, result}, index) =>
                    <tr key={index}>
                      <td>{date}</td>
                      <td>{opponent}</td>
                      <td>{result}</td>
                    </tr>,
                )
              }
              </tbody>
            </table>
          </section>

        }




      </section>
    </article>
  );
};

Schedule.propTypes = {
  data: PropTypes.object.isRequired,
  fetchInfo: PropTypes.func.isRequired,
};
