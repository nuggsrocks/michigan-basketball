import React from 'react';

const Roster = (props) => {
	let roster = props.data.roster;

	let rosterKeys = [];

	if (roster.length > 0) {
		rosterKeys = Object.keys(roster[0]);
	}

	return (
		<article>
			<h2>Roster</h2>

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
							roster.map(({Name, POS, HT, WT, Class, Birthplace}, index) =>
								<tr key={index}>
									<td>{Name}</td>
									<td>{POS}</td>
									<td>{HT}</td>
									<td>{WT}</td>
									<td>{Class}</td>
									<td>{Birthplace}</td>
								</tr>
							)
						}
					</tbody>
				</table>
			</section>
			
		</article>
	)
};

export default Roster;