import '@babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';

import '../../scss/main.scss';
import '~/commons/config';

import Auth from './components/Auth.jsx';

ReactDOM.render(
  <Auth />,
  document.getElementById('root'),
);
