import React from 'react';
import {StatLeaders} from '../components/StatLeaders';
import {TeamStats} from '../components/TeamStats';

export const Stats = (props) => {

	let {playerStats, teamStats} = props.data;

	let headers;

	if (playerStats && teamStats) {
		headers = playerStats ? ['Name', 'Position', ...Object.keys(playerStats[0].data)] : [];
	} else {
		props.fetchInfo(['playerStats', 'teamStats']);
	}

	return (
		<article>
			<h2>Team Stats</h2>

			<TeamStats teamStats={teamStats}/>

			<h2>Player Stats</h2>

			<section>

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
									<th key={index} onClick={() => props.sortStats(key)}>{key}</th>
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
											<td key={index}>{stat}</td>
										)
									}
								</tr>
							)
						}
						</tbody>
					</table>
				}

			</section>


			<StatLeaders playerStats={playerStats}/>

		</article>
	)
}

