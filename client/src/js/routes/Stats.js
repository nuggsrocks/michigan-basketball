import React from 'react';
import {StatLeaders} from '../components/StatLeaders';
import PropTypes from 'prop-types';

export const Stats = (props) => {
  const {playerStats, teamStats} = props.data;


  if (!playerStats || !teamStats) {
    props.fetchInfo(['playerStats', 'teamStats']);
  }

  return (
    <article>
      

      <StatLeaders playerStats={playerStats}/>

    </article>
  );
};

Stats.propTypes = {
  data: PropTypes.object.isRequired,
  fetchInfo: PropTypes.func.isRequired,
  sortStats: PropTypes.func.isRequired,
};

