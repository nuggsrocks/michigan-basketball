import React from 'react';
import PropTypes from 'prop-types';

export const Roster = (props) => {
  const {roster} = props.data;

  let playerInfoKeys = [];

  if (roster) {
    playerInfoKeys = Object.keys(roster[0]);
  } else {
    props.fetchInfo(['roster']);
  }

  return (
    <article>
      <h1>Roster</h1>

      {
        !roster &&
				<div className='loadingIcon'/>
      }


      {
        roster &&
        <section>

          <table>

            <thead>
            <tr>

              {
                playerInfoKeys.map((header, index) => {
                  return <th key={index}>{header}</th>;
                })
              }
            </tr>
            </thead>
            <tbody>
            {
              roster.map((player, index) =>
                  <tr key={index}>
                    {
                      Object.keys(player).map((key, index) =>
                          <td key={index}>{player[key]}</td>,
                      )

                    }
                  </tr>,
              )
            }
            </tbody>
          </table>
        </section>
      }


    </article>
  );
};


Roster.propTypes = {
  data: PropTypes.object.isRequired,
  fetchInfo: PropTypes.func.isRequired,
};
