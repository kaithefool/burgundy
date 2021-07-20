import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
} from 'react-router-dom';

import Nav from './layout/Nav';
import { Routes } from './routes';

const Auth = () => (
  <div className="container-fluid">
    <div className="row">
      <Router>
        <Nav className="col-auto" />
        <div className="col">
          <Routes />
        </div>
      </Router>
    </div>
  </div>
);

export default Auth;
