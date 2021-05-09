import 'core-js/stable';
import 'regenerator-runtime/runtime';

import '../scss/index.scss';

const init = async () => {
  try {
    const {default: React} = await import('react');
    const {BrowserRouter} = await import('react-router-dom');
    const {default: ReactDOM} = await import('react-dom');
    const {Main} = await import('./components/Main');
    const {Nav} = await import('./components/Nav');


    const App = () => {
      return (
        <BrowserRouter basename='/'>
          <Nav />
          <Main/>
        </BrowserRouter>
      );
    };


    ReactDOM.render(<App/>, document.querySelector('#root'));
  } catch (e) {
    console.error(e);
  }
};

init().catch((e) => document.querySelector('body').innerHTML = 'error: ' + e);
