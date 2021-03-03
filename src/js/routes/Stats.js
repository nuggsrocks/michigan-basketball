import React from 'react';
import {StatLeaders} from '../components/StatLeaders';
import {TeamStats} from '../components/TeamStats';
import {PlayerStats} from '../components/PlayerStats';

export const Stats = (props) => {

	let {playerStats, teamStats} = props.data;


	if (!playerStats || !teamStats) {
		props.fetchInfo(['playerStats', 'teamStats']);
	}

	return (
		<article>
			<TeamStats teamStats={teamStats}/>

			<PlayerStats playerStats={playerStats}/>

			<StatLeaders playerStats={playerStats}/>

		</article>
	)
}

