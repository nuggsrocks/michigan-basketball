import React from 'react';

const Standings = (props) => {
	let standings = props.standings;

	return (
		<article>

			<section>
				<h2>Big Ten Standings</h2>

				<table className='schedulePage'>
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

		statCategories.splice(statCategories.indexOf('FGM'), 2, 'FG%');

		statCategories.splice(statCategories.indexOf('FTM'), 2, 'FT%');

		statCategories.splice(statCategories.indexOf('3PM'), 2, '3P%');

		let statLeaders = {};

		statCategories.forEach((statName) => {

			const sortCallback = (a, b) => {
				let result;

				if (statName === 'GP') {
					result =  b.data[statName] - a.data[statName];
				} else if (statName.search(/%/) !== -1) {
					let statMade = statName.replace('%', 'M');
					let statAtt = statName.replace('%', 'A');
					result = (b.data[statMade] / b.data[statAtt]) - (a.data[statMade] / a.data[statAtt]);
				} else {
					result = (b.data[statName] / b.data['GP']) - (a.data[statName] / a.data['GP']);
				}

				return result;
			};

			const filterCallback = (player) => {
				if (statName.search(/%/) !== -1) {
					return player.data[statName.replace('%', 'A')] > 20;
				} else {
					return true;
				}
			};




			statLeaders[statName] = stats.sort(sortCallback).filter(filterCallback).slice(0, 5).map(({name, data}, index) => {
				let statValue;

				if (statName === 'GP') {
					statValue = Math.round(data[statName] * 10) / 10;
				} else if (statName.search(/%/) !== -1) {
					let statMade = statName.replace('%', 'M');
					let statAtt = statName.replace('%', 'A');
					let percentage = data[statMade] / data[statAtt];
					statValue = `${Math.round(percentage * 1000) / 10}%`;
				} else {
					statValue = Math.round((data[statName] / data['GP']) * 10) / 10;
				}
				return <tr key={index}>
					<td>{name}</td>
					<td>{statValue}</td>
				</tr>
			});
		});

		let statKeys = Object.keys(statLeaders);
		
		return statKeys.map((key, index) => 
			<section key={index}>
				<h3>{key}</h3>
				<table className='schedulePage'>
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