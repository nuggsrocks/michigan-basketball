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
		<BrowserRouter basename={'/'}>
		    <Navigation />
		    <Main />
		</BrowserRouter>
	  )
};

const Navigation = () => {
	return (
		<header>
			
				
			<img
				id={'menu-logo'}
				src={'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Michigan_Wolverines_logo.svg/2000px-Michigan_Wolverines_logo.svg.png'}
				alt={'Michigan Block M'}
			/>
				
			
			<nav>
				{
					routes.map(({path, name}) => 
					
						<Link to={path} key={path}>
							{name}
						</Link>
						
					)
				}
			</nav>
			
		</header>
	  )
};

const Main = () => {
	  return (
		<main>
			{routes.map(({path, Component}) => (
				<Route key={path} path={path}>
					<Component/>
				</Route>
			))}
		    <Redirect to={'/schedule'}/>
		</main>
	  )
};

ReactDOM.render(<App/>, document.querySelector('#root'));