export const getRoster = async () => {
	try {
		const {default: React} = await import('react');

		return (props) => {
			let roster = props.data.roster;

			let rosterKeys = [];

			if (roster.length > 0) {
				rosterKeys = Object.keys(roster[0]);
			}

			return (
				<article>
					<h1>Roster</h1>

					{
						roster.length === 0 &&
						<div className='loadingIcon'/>
					}

					<section>

						<table>

							<thead>
							<tr>

								{
									rosterKeys.map((header, index) => <th key={index}>{header}</th>)
								}
							</tr>
							</thead>
							<tbody>
							{
								roster.map((player, index) =>
									<tr key={index}>
										{
											Object.keys(player).map((key, index) =>
												<td key={index}>{player[key]}</td>
											)

										}
									</tr>
								)
							}
							</tbody>
						</table>
					</section>

				</article>
			)
		};
	} catch(e) {
	    console.error(e);
	}
};