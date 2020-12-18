import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import { PageLogin } from './pages';

const Auth = () => (
  <Router>
    <Switch>
      <Route path="/auth" exact>
        <PageLogin />
      </Route>
    </Switch>
  </Router>
);

export default Auth;
