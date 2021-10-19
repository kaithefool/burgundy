import '@babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';

import '../../scss/app.scss';
import '~/commons/config';

import App from './components/App';

ReactDOM.render(
  <App />,
  document.getElementById('root'),
);
