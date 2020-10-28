import React from 'react';




export class Roster extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			stats: null,
			stats: null
		};
	}

	componentDidMount() {
		fetch('http://localhost:8080/fetch/stats')
			.then(res => res.json())
			.then(stats => this.setState({stats}))
			.catch(e => console.error(e));

	}

	render() {
		let stats = this.state.stats;
		return (
			<section>
				
			<table>
			<tbody>
			{
				stats !== null &&
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
}

