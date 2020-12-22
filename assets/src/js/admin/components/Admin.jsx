import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
} from 'react-router-dom';

import Nav from './layout/Nav.jsx';
import {
  RoutePages,
} from './routes';

const Auth = () => (
  <div className="container-fluid h-100">
    <div className="row h-100">
      <Router>
        <Nav />
        <div className="col">
          <Switch>
            <RoutePages path="/admin/pages" />
          </Switch>
        </div>
      </Router>
    </div>
  </div>
);

export default Auth;
