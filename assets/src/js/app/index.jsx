import '@babel/polyfill';
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';

import '../../scss/main.scss';
import '~/commons/config';

import App from './components/App';

ReactDOM.render(
  <Suspense fallback="loading...">
    <App />
  </Suspense>,
  document.getElementById('root'),
);
