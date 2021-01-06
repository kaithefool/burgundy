import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
} from 'react-router-dom';

import Nav from './layout/Nav.jsx';
import {
  RoutePages,
  RouteUsers,
} from './routes';

const Auth = () => (
  <div className="container-fluid">
    <div className="row">
      <Router>
        <Nav className="col-auto" />
        <div className="col">
          <Switch>
            <RoutePages path="/admin/pages" />
            <RouteUsers path="/admin/users" />
          </Switch>
        </div>
      </Router>
    </div>
  </div>
);

export default Auth;
