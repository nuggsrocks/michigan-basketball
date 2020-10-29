import React from 'react';




export const Roster = (props) => {
	let stats = props.data.stats;

	return (
		<section>

			<table>
				{/*<thead>
					<tr>
						{
							stats.length > 0 &&
							Object.keys(stats[0].data).map((key, index) => 
								<th key={index}>{key}</th>
							)
						}
					</tr>
				</thead>*/}
				<tbody>
					{
						stats.map(({name, position, data}, index) => 
							<tr key={index}>
							<td>{name}</td>
							<td>{position}</td>
							{
								Object.values(data).map((stat, index) => 
									<td key={index}>{stat}</td>
									)
							}
							</tr>
						)
					}
				</tbody>
			</table>

		</section>
	)
}

