import React from 'react';

const Standings = (props) => {
	let standings = props.standings;

	return (
		<article>

			<section>
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
			</section>
			
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

		let statLeaders = {};

		statCategories.forEach((statName) => {

			const sortCallback = (a, b) => {
				let result;

				if (statName === 'GP') {
					result =  b.data[statName] - a.data[statName];
				} else {
					result = (b.data[statName] / b.data['GP']) - (a.data[statName] / a.data['GP']);
				}

				return result;
			};


			statLeaders[statName] = stats.sort(sortCallback).slice(0, 5).map(({name, data}, index) => {
				let statValue;

				if (statName === 'GP') {
					statValue = data[statName];
				} else {
					statValue = data[statName] / data['GP'];
				}
				return <tr key={index}>
					<td>{name}</td>
					<td>{Math.round(statValue * 10) / 10}</td>
				</tr>
			});
		});

		let statKeys = Object.keys(statLeaders);
		
		return statKeys.map((key, index) => 
			<section key={index}>
				<table>
					<thead>
						<tr>
							<th colSpan='3'>{key}</th>
						</tr>
					</thead>
					<tbody>
						{statLeaders[key]}
					</tbody>
				</table>
			</section>
		)
	};

	
	return (
		<article>

			<h2>Stat Leaders</h2>

			{
				stats.length > 0 && displayStatLeaders()
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