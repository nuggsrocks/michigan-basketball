import React from 'react';




export class Roster extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			roster: null
		};
	}

	componentDidMount() {
		fetch('http://localhost:8080/server/roster')
			.then(res => res.json())
			.then(data => this.setState({roster: data}));
	}

	render() {
		return (
			<section>
				
				{
					this.state.roster !== null &&
						<table>
							<thead>
								<tr>
									<th>Name</th>
									<th>Number</th>
									<th>Position</th>
									<th>Year</th>
								</tr>
							</thead>
							<tbody>
								{
									this.state.roster.map(player => 
										<tr>
											<td>{player[1]}</td>
											<td>{player[2]}</td>
											<td>{player[3]}</td>
											<td>{player[4]}</td>
										</tr>
									)
								}
							</tbody>
						</table>
				}
			
			</section>
		)
	}
}

