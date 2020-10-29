import React from 'react';
import ReactDOM from 'react-dom';
import {Link, BrowserRouter, Route, Redirect} from 'react-router-dom';
import {Schedule} from './components/schedule';
import {Roster} from './components/roster';
import '../scss/index.scss';

const routes = [
    {path: '/schedule', name: 'Schedule', Component: Schedule},
    {path: '/roster', name: 'Roster', Component: Roster}            
];

const App = () => {
	  return (
		<BrowserRouter basename='/'>
		    <Navigation />
		    <Main />
		</BrowserRouter>
	  )
};

const Navigation = () => {
	return (
		<header>
			
				
			<img
				id='menu-logo'
				src='https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Michigan_Wolverines_logo.svg/2000px-Michigan_Wolverines_logo.svg.png'
				alt='Michigan Block M'
			/>
				
			
			<nav>
				{
					routes.map(({path, name}) => 
						<button key={path}>
							<Link to={path}>
								{name}
							</Link>
						</button>
						
					)
				}
			</nav>
			
		</header>
	  )
};

class Main extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			standings: [],
			schedule: [],
			stats: []
		};


	}

	componentDidMount() {
		fetch('http://localhost:8080/fetch/standings')
			.then(res => res.json())
			.then(standings => this.setState({standings}))
			.catch(e => console.error(e));

		fetch('http://localhost:8080/fetch/stats')
			.then(res => res.json())
			.then(stats => this.setState({stats}))
			.catch(e => console.error(e));

	}

	render () {
	  	return (
			<main>
				{
					routes.map(({path, Component}) => 
						<Route key={path} path={path}>
							<Component data={this.state}/>
						</Route>
					)
				}
				<Route exact path='/'>
					<Redirect to='/schedule'/>
				</Route>
			</main>
		)
	}
};

ReactDOM.render(<App/>, document.querySelector('#root'));