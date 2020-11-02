import React from 'react';

export const Roster = (props) => {
	let stats = [...props.data.stats];

	let headers = stats.length > 0 ? ['Name', 'Position', ...Object.keys(stats[0].data)] : [];
	return (
		<article>

			<section>

				{
					stats.length === 0 &&
					<div className='loadingIcon'/>
				}

				{
					stats.length > 0 &&
					<table>
						<thead>
							<tr>
							{
								headers.map((key, index) => 
									<th key={index} onClick={() => props.sortStats(key)}>{key}</th>
									)
							}
							</tr>
						</thead>
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
				}

			</section>

		</article>
	)
}

