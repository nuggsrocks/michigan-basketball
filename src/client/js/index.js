import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import '../scss/index.scss';

import Main from './components/Main';
import Navigation from "./components/Navigation";

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