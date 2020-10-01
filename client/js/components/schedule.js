import React from "react";
import {players, schedule} from '../../data/data';
import {findPerGame, findFieldGoalPercentage} from '../stats-functions';

const playerArr = [...players];


class Standings extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			wins: 0,
			losses: 0,
			confWins: 0,
			confLosses: 0,
			teams: []
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
			.then(json =>
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
				})
			);
	}


	render() {
		let standingsArr = [...this.state.teams];

		standingsArr.sort((a, b) =>
			a.record[0] === b.record[0] && a.record[1] === b.record[1] ? a.name.localeCompare(b.name) :
				((b.record[0]) / ((b.record[0]) + (b.record[1]))) - ((a.record[0]) / ((a.record[0]) + (a.record[1])))
		);
		return (
			<div>
				<h2>
					{this.state.wins + ' - ' + this.state.losses + ' (' +
					this.state.confWins + ' - ' + this.state.confLosses + ' Big Ten)'}
				</h2>
				
				<table>
					<thead>
					<tr>
						<th colSpan='3'>Big Ten Standings</th>
					</tr>
					</thead>
					<tbody>
					{standingsArr.map(({name, record}, index) => (
						<tr key={index}>
							<th>{index + 1}</th>
							<td>{name}</td>
							<td>{record[0] + ' - ' + record[1]}</td>
						</tr>
					))}
					</tbody>
				</table>
			</div>
		)
	}
}

const ScheduleList = (props) => {
	return (
		<div className={props.className}>
			<h1>Schedule</h1>
			<table>
				<thead>
				<tr>
					<th>Opponent</th>
					<th>Date</th>
					<th>Result</th>
				</tr>
				</thead>
				<tbody>
				{schedule.map(({opp, date, result, link}) => (
					<tr key={opp}>
						<td>{opp}</td>
						<td>{date}</td>
						<td>
							<a href={link}>
								<span className={result.win ? 'win' : 'loss'}>
									{(result.win ? 'W ' : result.win === false ? 'L ' : '')}
								</span>
								{result.score}
							</a>
						</td>
					</tr>
				))}
				</tbody>
			</table>
		</div>
	)
};

class StatLeaders extends React.Component {
	render() {
		return (
			<div className={this.props.className}>
				<h2>Stat Leaders</h2>
				
				<table>
					<thead>
					<tr>
						<th colSpan='3'>Points</th>
					</tr>
					</thead>
					<tbody>
					{
						playerArr.sort((a, b) => {
								return findPerGame(b.stats.map(({points}) => points)) - findPerGame(a.stats.map(({points}) => points))
							})
							.slice(0, 5)
							.map(({name, num, stats}) => (
								<tr key={name}>
									<th>{name}</th>
									<th>#{num}</th>
									<td>
										{findPerGame(stats.map(({points}) => points)) + ' PPG'}
									</td>
								</tr>
							))
					}
					</tbody>
				</table>

				<table>
					<thead>
					<tr>
						<th colSpan='3'>Assists</th>
					</tr>
					</thead>
					<tbody>
					{playerArr.sort((a, b) =>
						findPerGame(b.stats.map(({assists}) => assists)) - findPerGame(a.stats.map(({assists}) => assists)))
						.slice(0, 5)
						.map(({name, num, stats}) => (
							<tr key={name}>
								<th>{name}</th>
								<th>#{num}</th>
								<td>
									{findPerGame(stats.map(({assists}) => assists)) + ' APG'}
								</td>
							</tr>
						))}
					</tbody>
				</table>
				
				<table>
					<thead>
					<tr>
						<th colSpan='3'>Rebounds</th>
					</tr>
					</thead>
					<tbody>
					{playerArr.sort((a, b) =>
						findPerGame(b.stats.map(({rebounds}) => rebounds)) - findPerGame(a.stats.map(({rebounds}) => rebounds)))
						.slice(0, 5)
						.map(({name, num, stats}) =>
							<tr key={name}>
								<th>{name}</th>
								<th>#{num}</th>
								<td>
									{findPerGame(stats.map(({rebounds}) => rebounds)) + ' RPG'}
								</td>
							</tr>
						)
					}
					</tbody>
				</table>

				<table>
					<thead>
					<tr>
						<th colSpan='3'>Field Goals</th>
					</tr>
					</thead>
					<tbody>
					{playerArr.sort((a, b) =>
						findFieldGoalPercentage(b.stats.map(({fgm}) => fgm), b.stats.map(({fga}) => fga)) -
						findFieldGoalPercentage(a.stats.map(({fgm}) => fgm), a.stats.map(({fga}) => fga)))
						.filter((player) => player.stats.map(({fga}) => fga).reduce((a, b) => a + b) > 50)
						.slice(0, 5)
						.map(({name, num, stats}) =>
							<tr key={name}>
								<th>{name}</th>
								<th>#{num}</th>
								<td>
									{findFieldGoalPercentage(stats.map(({fgm}) => fgm), stats.map(({fga}) => fga)) + '%'}
								</td>
							</tr>
						)
					}
					</tbody>
				</table>
				
				<table>
					<thead>
					<tr>
						<th colSpan='3'>Minutes</th>
					</tr>
					</thead>
					<tbody>
					{playerArr.sort((a, b) =>
						findPerGame(b.stats.map(({mins}) => mins)) - findPerGame(a.stats.map(({mins}) => mins)))
						.slice(0, 5)
						.map(({name, num, stats}) =>
							<tr key={name}>
								<th>{name}</th>
								<th>#{num}</th>
								<td>
									{findPerGame(stats.map(({mins}) => mins)) + ' MPG'}
								</td>
							</tr>
						)
					}
					</tbody>
				</table>
			</div>
		)
	}
}

export class Schedule extends React.Component {
	render() {
		return (
			<section>
				<StatLeaders/>
				<ScheduleList/>
				<Standings/>
			</section>
		);
	}
}