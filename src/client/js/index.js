import 'core-js/stable';
import 'regenerator-runtime/runtime';

import '../scss/index.scss';

import {getMain} from './components/Main';
import {getNav} from "./components/Nav";

import('react').then(({default: React}) => {
	import('react-router-dom').then(({BrowserRouter}) => {

		getMain().then(Main => {

			getNav().then(Nav => {
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
			})
		})

	});
});