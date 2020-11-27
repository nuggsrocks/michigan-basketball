import 'core-js/stable';
import 'regenerator-runtime/runtime';

import React from 'react';
import '../scss/index.scss';

import {getMain} from './components/Main';
import {getNavigation} from "./components/Navigation";

import('react-router-dom').then(({BrowserRouter}) => {
	getMain().then(Main => {

		getNavigation().then(Nav => {
			const App = () => {
				return (
					<BrowserRouter basename='/'>
						<Nav />
						<Main />
					</BrowserRouter>
				)
			};

			import('react-dom').then(({default: ReactDOM}) => {
				ReactDOM.render(<App/>, document.querySelector('#root'));
			});
		});

	});

});