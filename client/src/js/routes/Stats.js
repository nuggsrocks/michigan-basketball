import React from 'react';
import {StatLeaders} from '../components/StatLeaders';
import {TeamStats} from '../components/TeamStats';
import {PlayerStats} from '../components/PlayerStats';
import PropTypes from 'prop-types';

export const Stats = (props) => {
  const {playerStats, teamStats} = props.data;


  if (!playerStats || !teamStats) {
    props.fetchInfo(['playerStats', 'teamStats']);
  }

  return (
    <article>
      <TeamStats teamStats={teamStats}/>

      <PlayerStats sortStats={props.sortStats} playerStats={playerStats}/>

      <StatLeaders playerStats={playerStats}/>

    </article>
  );
};

Stats.propTypes = {
  data: PropTypes.object.isRequired,
  fetchInfo: PropTypes.func.isRequired,
};

