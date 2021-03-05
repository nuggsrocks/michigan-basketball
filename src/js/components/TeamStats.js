import React from 'react';

export class TeamStats extends React.Component {

	render() {
		const {teamStats} = this.props;

		let statKeys;

		if (teamStats) {
			statKeys = Object.keys(teamStats.seasonTotals.michigan);
		}

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
						</section>
					</div>
					:
					<div className='loadingIcon'/>
			}
		</section>;
	}
}