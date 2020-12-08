import React from 'react';
import {StatLeaders} from './StatLeaders';

export const Stats = (props) => {
	let stats = props.data.stats;

	let {playerStats} = stats;

	let headers = stats.hasOwnProperty('playerStats') ? ['Name', 'Position', ...Object.keys(playerStats[0].data)] : [];

	return (
		<article>
			<h2>Player Stats</h2>

			<section>

				{
					!stats.hasOwnProperty('playerStats') &&
					<div className='loadingIcon'/>
				}

				{
					stats.hasOwnProperty('playerStats') &&
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


			<StatLeaders data={props.data}/>

		</article>
	)
};

