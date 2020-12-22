import '@babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';

import '../../scss/main.scss';
import '~/commons/config';

import App from './components/App.jsx';

ReactDOM.render(
  <App />,
  document.getElementById('root'),
);
