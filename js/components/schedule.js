import React from 'react';

const Standings = (props) => {
	let standings = props.standings;

	return (
		<article>

			<h2>Big Ten Standings</h2>

			<table>
				<tbody>
					{
						standings.sort((a, b) => b.record.split('-')[0] - a.record.split('-')[0]).map(({name, record}, index) => 
							<tr key={index}>
								<th>{index + 1}</th>
								<td>{name}</td>
								<td>{record}</td>
							</tr>
						)
					}
				</tbody>
			</table>
			
		</article>
	)
	
}

const ScheduleList = (props) => {
	return (
		<article>
			<h1>Schedule</h1>
			

		</article>
	)
};

const StatLeaders = (props) => {
	let stats = props.stats;

	const displayStatLeaders = () => {
		let statCategories = stats.length > 0 ? Object.keys(stats[0].data) : [];

		let statLeaders = [];

		statCategories.forEach(statName => {
			statLeaders.push(stats.sort((a, b) => b.data[statName] - a.data[statName]).slice(0, 5).map(({name, data}, index) =>
				<tr key={index}>
					<th>{index + 1}</th>
					<td>{name}</td>
					<td>{data[statName]}</td>
				</tr>
			))
		});
		
		return statLeaders.map((statTable, index) => 
			<section>
				<h3>{statCategories[index]}</h3>
				<table>
					<tbody>
						{statTable}
					</tbody>
				</table>
			</section>
		)
	};

	
	return (
		<article>

			<h2>Stat Leaders</h2>

			{
				displayStatLeaders()
			}
		</article>
	)
}

export const Schedule = (props) => {
	
	return (
		<div>
			<StatLeaders stats={props.data.stats}/>
			<ScheduleList />
			<Standings standings={props.data.standings}/>
		</div>
	);
}