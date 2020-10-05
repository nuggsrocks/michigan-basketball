import React from "react";

const Standings = (props) => {

	let standingsArr = [...props.data.teams];

	standingsArr.sort((a, b) =>
		a.record[0] === b.record[0] && a.record[1] === b.record[1] ? a.name.localeCompare(b.name) :
		((b.record[0]) / ((b.record[0]) + (b.record[1]))) - ((a.record[0]) / ((a.record[0]) + (a.record[1])))
		);
	return (
		<article>

			{standingsArr.length === 0 && <div className='loadingIcon'/>}
			
			{
				props.data.wins !== null &&
					<h2>{`${props.data.wins} - ${props.data.losses} (${props.data.confWins} - ${props.data.confLosses} Big Ten)`}</h2>
			}
			


			
			{
				standingsArr.length > 0 &&				
					<table>
						<thead>
							<tr>
								<th colSpan='3'>Big Ten Standings</th>
							</tr>
						</thead>
						<tbody>
						
						{
							standingsArr.map(({name, record}, index) => (
								<tr key={index}>
									<th>{index + 1}</th>
									<td>{name}</td>
									<td>{record[0] + ' - ' + record[1]}</td>
								</tr>
								))
						}
						</tbody>
					</table>
			}
		</article>
		)
	
}

const ScheduleList = (props) => {
	let schedule = props.data.schedule;
	return (
		<article>
			<h1>Schedule</h1>
			{
				schedule === null ? 
					<div className='loadingIcon'/>
					:
					schedule.length === 0 ? 
						<h2>TBD</h2>
						:
						<table>
							<thead>
							<tr>
								<th>Opponent</th>
								<th>Date</th>
								<th>Result</th>
							</tr>
							</thead>
							<tbody>

							{
								schedule.length > 0 &&
									schedule.map(game => (
										<tr key={game[0]}>
											<td>{game[1]}</td>
											<td>{game[2]}</td>
											<td>
												<a href='#'>
													{`${game[3]} - ${game[4]}`}
													&nbsp;
													<span className={game[3] > game[4] ? 'win' : 'loss'}>
														{game[3] > game[4] ? 'W ' : game[3] < game[4] ? 'L ' : ''}
													</span>
												</a>
											</td>
										</tr>
									))
							}
							</tbody>
						</table>

			}

		</article>
	)
};

const StatLeaders = (props) => {



	return (
		<article>
			
		</article>
	)
}

export class Schedule extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			wins: null,
			losses: null,
			confWins: null,
			confLosses: null,
			teams: [],
			schedule: null
		};
	}

	componentDidMount() {
		let iowa = 90;
		let mary = 91;
		let ind = 92;
		let pur = 93;
		let wisc = 95;
		let mst = 96;
		let ost = 97;
		let neb = 98;
		let nw = 99;
		let pst = 100;
		let ill = 101;
		let rut = 102;
		let minn = 103;

		fetch('https://api.sportsdata.io/v3/cbb/scores/json/teams?key=a6e6fd420bb74937b63317d76bd6d7c2')
			.then(res => res.json())
			.then(json => {
				this.setState({
					wins: Number(json[94]['Wins']),
					losses: Number(json[94]['Losses']),
					confWins: Number(json[94]['ConferenceWins']),
					confLosses: Number(json[94]['ConferenceLosses']),
					teams: [
					{name: 'Iowa', record: [json[iowa]['ConferenceWins'], json[iowa]['ConferenceLosses']]},
					{name: 'Maryland', record: [json[mary]['ConferenceWins'], json[mary]['ConferenceLosses']]},
					{name: 'Indiana', record: [json[ind]['ConferenceWins'], json[ind]['ConferenceLosses']]},
					{name: 'Purdue', record: [json[pur]['ConferenceWins'], json[pur]['ConferenceLosses']]},
					{name: 'Wisconsin', record: [json[wisc]['ConferenceWins'], json[wisc]['ConferenceLosses']]},
					{name: 'Michigan State', record: [json[mst]['ConferenceWins'], json[mst]['ConferenceLosses']]},
					{name: 'Ohio State', record: [json[ost]['ConferenceWins'], json[ost]['ConferenceLosses']]},
					{name: 'Nebraska', record: [json[neb]['ConferenceWins'], json[neb]['ConferenceLosses']]},
					{name: 'Penn State', record: [json[pst]['ConferenceWins'], json[pst]['ConferenceLosses']]},
					{name: 'Illinois', record: [json[ill]['ConferenceWins'], json[ill]['ConferenceLosses']]},
					{name: 'Rutgers', record: [json[rut]['ConferenceWins'], json[rut]['ConferenceLosses']]},
					{name: 'Minnesota', record: [json[minn]['ConferenceWins'], json[minn]['ConferenceLosses']]},
					{name: 'Northwestern', record: [json[nw]['ConferenceWins'], json[nw]['ConferenceLosses']]},
					{name: 'Michigan', record: [json[94]['ConferenceWins'], json[94]['ConferenceLosses']]}
					]
				});

				let schedule;
				fetch('http://localhost:8080/server/schedule')
					.then(res => res.json())
					.then(data => {
						this.setState({
							schedule: data
						});
					})
					.catch(e => console.error(e));
			})
			.catch(e => console.error(e));

	}

	render() {
		return (
			<section>
				<StatLeaders data={this.state}/>
				<ScheduleList data={this.state}/>
				<Standings data={this.state}/>
			</section>
		);
	}
}