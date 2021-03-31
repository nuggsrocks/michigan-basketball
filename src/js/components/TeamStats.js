import React from 'react';

export class TeamStats extends React.Component {

	render() {
		const {teamStats} = this.props;

		let statKeys, teams;

		if (teamStats) {
			statKeys = Object.keys(teamStats.seasonTotals.michigan);
			teams = Object.keys(teamStats.seasonTotals);
		}

		console.log(teamStats);
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
											return <td key={index}>
												{teamStats.seasonTotals.michigan[key]}
											</td>
										})
									}
								</tr>
								</tbody>
							</table>
						</section>

						<section>
							<h3>Season Highs</h3>
							<div className='flex'>

								{
									teams.map((team, index) => {
										return <div key={index}>
											<h4>{team[0].toUpperCase() + team.substring(1)} Season Highs</h4>
											{
												statKeys.map((key, index) => {
													let text = teamStats.seasonHighsAndLows[team].seasonHighs[key];
													return <h4 key={index}>{key}: {text}</h4>
												})
											}
										</div>
									})
								}

								{
									teams.map((team, index) => {
										return <div key={index}>
											<h4>{team[0].toUpperCase() + team.substring(1)} Season Lows</h4>
											{
												statKeys.map((key, index) => {
													let text = teamStats.seasonHighsAndLows[team].seasonLows[key];
													return <h4 key={index}>{key}: {text}</h4>
												})
											}
										</div>
									})
								}

							</div>
						</section>
					</div>
					:
					<div className='loadingIcon'/>
			}
		</section>;
	}
}