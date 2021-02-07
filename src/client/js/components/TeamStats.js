import React from 'react';

export class TeamStats extends React.Component {

	render() {
		const {teamStats} = this.props.data;

		let statKeys, michiganStats, opponentStats, pointDifferential;
		if (teamStats) {
			statKeys = Object.keys(teamStats[0]['michigan']).concat(['fg%', '3p%', 'ft%']);

			michiganStats = teamStats.map(game => game.michigan);
			opponentStats = teamStats.map(game => game.opponent);

			pointDifferential = michiganStats.map(stat => stat['pts'])
				.reduce((a, b) => a + b) - opponentStats.map(stat => stat['pts'])
				.reduce((a, b) => a + b);

		}

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

						<section className='team-stats'>
							<div>
								<h3>Point Differential:</h3>
								<span>
									{
										pointDifferential > 0 ? '+' :
											pointDifferential < 0 ? '-' : ''
									}
									{
										pointDifferential
									}

								</span>
							</div>
						</section>
					</div>
					:
					<div className='loadingIcon'/>
			}
		</section>;
	}
}