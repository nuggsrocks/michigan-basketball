import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';

if(typeof(module.hot) !== 'undefined') { // eslint-disable-line no-undef
    module.hot.accept() // eslint-disable-line no-undef
}

ReactDOM.render(<App />, document.getElementById('root'));