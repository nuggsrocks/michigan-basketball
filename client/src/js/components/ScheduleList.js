import React from 'react';
import PropTypes from 'prop-types';

export const ScheduleList = (props) => {
  const {standings, schedule} = props;

  let michiganTeamObj;

  let michRecord;

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
      <h1>Schedule</h1>

      {
        standings ?
            <h2>
              {`${michRecord.overall} (${michRecord.conference} Big Ten)`}
            </h2>
            :
            <div className='loadingIcon'/>
      }


      <section>
        {
          schedule &&
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
        }
      </section>

    </article>
  );
};

ScheduleList.propTypes = {
  standings: PropTypes.array.isRequired,
  schedule: PropTypes.array.isRequired,
};
