import React from 'react';

const Standings = (props) => {


	return (
		<article>

			<h2>Big Ten Standings</h2>

			<table>
				<tbody>
					{
						props.standings !== null &&
						props.standings.sort((a, b) => b.record.split('-')[0] - a.record.split('-')[0]).map(({name, record}, index) => 
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
	let schedule = props.data.schedule;
	return (
		<article>
			<h1>Schedule</h1>
			

		</article>
	)
};

const StatLeaders = (props) => {



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
			schedule: null
		};
	}

	componentDidMount() {
		fetch('http://localhost:8080/standings')
			.then(res => res.json())
			.then(standings => this.setState({standings}))
			.catch(e => console.error(e));

	}

	render() {
		return (
			<section>
				<StatLeaders data={this.state}/>
				<ScheduleList data={this.state}/>
				<Standings standings={this.state.standings}/>
			</section>
		);
	}
}