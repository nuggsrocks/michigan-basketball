import React from 'react';

export class TeamStats extends React.Component {

	render() {
		const {teamStats} = this.props;

		let statKeys, stats = {};
		if (teamStats) {
			statKeys = Object.keys(teamStats[0]['michigan']).concat(['fg%', '3p%', 'ft%']);

			stats['michigan'] = teamStats.map(game => game.michigan);
			stats['opponent'] = teamStats.map(game => game.opponent);
		}

		const displayStatDifferentials = () => {
			let statKeys = Object.keys(stats['michigan'][0]);

			let differentials = [];
			statKeys.forEach(key => {
				let differential = stats['michigan'].map(stat => stat[key])
					.reduce((a, b) => a + b) - stats['opponent'].map(stat => stat[key])
					.reduce((a, b) => a + b);

				if (differential > 0) {
					differential = '+' + differential;
				}

				differentials.push({key, differential});
			});

			return <div>
				<h3>Stat Differentials:</h3>
				{
					differentials.map((stat, index) =>
						<h4 key={index}>
							{stat.key}: {stat.differential}
						</h4>
					)
				}
			</div>
		};

		const displayGameHighs = (team) => {

			let gameHighs = {};

			let keys = Object.keys(stats[team][0]);

			keys.forEach(key => {
				let highValue = 0;

				stats[team].forEach(game => {
					if (game[key] > highValue) {
						highValue = game[key];
					}
				});

				gameHighs[key] = highValue;
			});

			return <div>
				<h3>{team[0].toUpperCase() + team.substring(1)} Game Highs:</h3>
				{
					Object.keys(gameHighs).map((key, index) => {
						return <h4 key={index}>
							{key}: {gameHighs[key]}
						</h4>
					})
				}
			</div>
		};


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
												stat = stats['michigan'].map(stat => stat[key]).reduce((a, b) => a + b);
											} else {
												let made = stats['michigan'].map(stat => stat[key.replace('%', 'm')])
													.reduce((a, b) => a + b);

												let attempted = stats['michigan'].map(stat => stat[key.replace('%', 'a')])
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

						<section>
							<div className='flex'>
								{displayStatDifferentials()}
								{displayGameHighs('michigan')}
								{displayGameHighs('opponent')}
							</div>
						</section>
					</div>
					:
					<div className='loadingIcon'/>
			}
		</section>;
	}
}