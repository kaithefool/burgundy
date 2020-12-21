import '@babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';

import '../../scss/main.scss';
import '~/commons/config';

import Admin from './components/Admin.jsx';

ReactDOM.render(
  <Admin />,
  document.getElementById('root'),
);
