import React from 'react';

export class TeamStats extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			teamStats: null
		};
	}


	componentDidMount() {
		fetch('http://localhost:8080/fetch/team-stats')
			.then(res => res.json())
			.then(teamStats => this.setState({teamStats}));
	}

	render() {
		const {teamStats} = this.state;

		let statKeys = teamStats && Object.keys(teamStats[0]['michigan']).concat(['fg%', '3p%', 'ft%']);

		let michiganStats = teamStats && teamStats.map(game => game.michigan);

		return <section>
			{
				teamStats ?
					<div>
						<section>
							<table>
								<thead>
								<tr>
									{
										statKeys.map((key, index) => {
											return <th key={index}>{key}</th>
										})
									}
								</tr>
								</thead>
								<tbody>
								<tr>
									{
										statKeys.map((key, index) => {
											let stat;
											if (key.search('%') === -1) {
												stat = michiganStats.map(stat => stat[key]).reduce((a, b) => a + b);
											} else {
												let made = michiganStats.map(stat => stat[key.replace('%', 'm')])
													.reduce((a, b) => a + b);

												let attempted = michiganStats.map(stat => stat[key.replace('%', 'a')])
													.reduce((a, b) => a + b);

												stat = Math.round(made * 10000 / attempted) / 100;
											}

											return <td key={index}>
												{stat}
											</td>
										})
									}
								</tr>
								</tbody>
							</table>
						</section>
					</div>
					:
					<div className='loadingIcon'/>
			}
		</section>;
	}
}