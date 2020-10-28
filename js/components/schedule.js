import React from 'react';

const Standings = (props) => {
	let standings = props.standings;

	return (
		<article>

			<h2>Big Ten Standings</h2>

			<table>
				<tbody>
					{
						standings !== null &&
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
	let schedule = props.schedule;
	return (
		<article>
			<h1>Schedule</h1>
			

		</article>
	)
};

const StatLeaders = (props) => {

	let stats = props.stats;

	return (
		<article>

			<h2>Stat Leaders</h2>

			

			
		</article>
	)
}

export class Schedule extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			standings: null,
			schedule: null,
			stats: null
		};
	}

	componentDidMount() {
		fetch('http://localhost:8080/fetch/standings')
			.then(res => res.json())
			.then(standings => this.setState({standings}))
			.catch(e => console.error(e));

	}

	render() {
		return (
			<div>
				<StatLeaders stats={this.state.stats}/>
				<ScheduleList data={this.state}/>
				<Standings standings={this.state.standings}/>
			</div>
		);
	}
}