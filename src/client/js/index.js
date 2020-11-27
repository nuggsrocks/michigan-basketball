import React from 'react';
import '../scss/index.scss';

import Main from './components/Main';
import Navigation from "./components/Navigation";

import('react-router-dom').then(({BrowserRouter}) => {
	const App = () => {
		return (
			<BrowserRouter basename='/'>
				<Navigation />
				<Main />
			</BrowserRouter>
		)
	};

	import('react-dom').then(({default: ReactDOM}) => {
		ReactDOM.render(<App/>, document.querySelector('#root'));
	});

});