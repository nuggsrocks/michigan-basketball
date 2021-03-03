import React from 'react';

export class TeamStats extends React.Component {

	render() {
		const {teamStats} = this.props;

		let statKeys, stats = {};
		if (teamStats) {
			statKeys = Object.keys(teamStats[0]['michigan'])
				.filter(key => key !== 'gameInfo')
				.concat(['fg%', '3p%', 'ft%']);

			stats['michigan'] = teamStats.map(game => game.michigan);
			stats['opponent'] = teamStats.map(game => game.opponent);
		}

		const displayStatDifferentials = () => {
			let statKeys = Object.keys(stats['michigan'][0])
				.filter(key => key.search('%') === -1 && key !== 'gameInfo');

			let differentials = [];
			statKeys.forEach(key => {
				let differential = stats['michigan'].map(stat => stat[key])
					.reduce((a, b) => a + b) - stats['opponent'].map(stat => stat[key])
					.reduce((a, b) => a + b);

				if (key === 'to') {
					if (differential > 0) {
						differential = -differential;
					} else if (differential < 0) {
						differential = '+' + -differential;
					}
				} else {
					if (differential > 0) {
						differential = '+' + differential;
					}
				}

				differentials.push({key, differential});
			});

			return <div>
				<h3>Stat Differentials:</h3>
				<table>
					<thead>
					<tr>
						{
							differentials.map((stat, index) =>
								<th key={index}>
									{stat.key}
								</th>
							)
						}
					</tr>
					</thead>
					<tbody>
					<tr>
						{
							differentials.map((stat, index) =>
								<td key={index}>
									{stat.differential}
								</td>
							)
						}
					</tr>
					</tbody>
				</table>
			</div>
		};


		const displayGameHighsOrLows = (team, highsOrLows) => {

			let values = {};

			let keys = Object.keys(stats[team][0]).filter(key => key !== 'gameInfo');

			keys.forEach(key => {
				let extremeValue = {
					value: 0,
					game: null
				};

				stats[team].forEach((game, index) => {
					if (game[key] === extremeValue.value) {
						extremeValue.game += ', ' + game['gameInfo'];
					}

					if (highsOrLows === 'highs') {

						if (game[key] > extremeValue.value) {
							extremeValue.value = game[key];
							extremeValue.game = game['gameInfo'];
						}
					} else {
						if (index === 0) {
							extremeValue.value = game[key];
							extremeValue.game = game['gameInfo'];
						}
						if (game[key] < extremeValue.value) {
							extremeValue.value = game[key];
							extremeValue.game = game['gameInfo'];
						}
					}
				});

				values[key] = extremeValue;
			});

			return <div>
				<h3>
					{team[0].toUpperCase() + team.substring(1)}
					&nbsp;
					Game
					&nbsp;
					{highsOrLows[0].toUpperCase() + highsOrLows.substring(1)}:
				</h3>
				{
					Object.keys(values).map((key, index) => {
						return <h4 key={index}>
							{key}: {values[key].value} {'(' + values[key].game + ')'}
						</h4>
					})
				}
			</div>
		};


		return <section>
			<h2>Team Stats</h2>
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
							{displayStatDifferentials()}
							<div className='flex'>
								{displayGameHighsOrLows('michigan', 'highs')}
								{displayGameHighsOrLows('michigan', 'lows')}
								{displayGameHighsOrLows('opponent', 'highs')}
								{displayGameHighsOrLows('opponent', 'lows')}
							</div>
						</section>
					</div>
					:
					<div className='loadingIcon'/>
			}
		</section>;
	}
}