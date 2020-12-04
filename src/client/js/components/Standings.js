import React from 'react';

export const Standings = (props) => {
    let standings = props.data.standings;

    return (
        <article>

            <h2>Big Ten Standings</h2>

            {
                standings.length === 0 && <div className='loadingIcon'/>
            }

            <section>
                {
                    standings.length > 0 &&
                    <table className='schedulePage'>
                        <tbody>
                        {
                            standings.sort((a, b) => b.record.conference.split('-')[0] - a.record.conference.split('-')[0])
                                .map(({name, record}, index) => {
                                        return <tr key={index}>
                                            <th>{index + 1}</th>
                                            <td>{name}</td>
                                            <td>{`${record.conference} (${record.overall})`}</td>
                                        </tr>
                                    }
                                )
                        }
                        </tbody>
                    </table>
                }
            </section>

        </article>
    )

};