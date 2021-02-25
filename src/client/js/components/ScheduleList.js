import React from 'react';

export const ScheduleList = (props) => {
    let {standings, schedule} = props;

    let michiganTeamObj;

    let michRecord;

    if (standings) {

        michiganTeamObj = standings.find(team => team.name === 'Michigan Wolverines')
        michRecord = {
            conference: michiganTeamObj.record.conference,
            overall: michiganTeamObj.record.overall
        };
    }

    return (
        <article>
            <h1>Schedule</h1>

            {
                standings ?
                <h2>{`${michRecord.overall} (${michRecord.conference} Big Ten)`}</h2> :
                    <div className='loadingIcon'/>
            }


            <section>
                {
                    schedule &&
                    <table>
                        <thead>
                        <tr>
                            {
                                Object.keys(schedule[0]).map((key, index) => key !== 'link' && <th key={index}>{key[0].toUpperCase() + key.slice(1)}</th>)
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
                                </tr>
                            )
                        }
                        </tbody>
                    </table>
                }
            </section>

        </article>
    )
};