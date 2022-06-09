import '@babel/polyfill';
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { io } from 'socket.io-client';

import '../../scss/main.scss';
import '~/commons/config';

import Admin from './components/Admin';

const socket = io();

socket.on('connect', () => {
  console.log('connected');
});

ReactDOM.render(
  <Suspense fallback="loading...">
    <Admin />
  </Suspense>,
  document.getElementById('root'),
);
