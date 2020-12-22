import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
} from 'react-router-dom';

import {
  RouteAuth,
} from './routes';

const Auth = () => (
  <Router>
    <Switch>
      <RouteAuth path="/auth" />
    </Switch>
  </Router>
);

export default Auth;
