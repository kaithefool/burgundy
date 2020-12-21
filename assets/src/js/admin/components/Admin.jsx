import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import Nav from './layout/Nav.jsx';

const Auth = () => (
  <div className="container-fluid h-100">
    <div className="row h-100">
      <Router>
        <Nav />
        <div className="col">
          <Switch>

          </Switch>
        </div>
      </Router>
    </div>
  </div>
);

export default Auth;
