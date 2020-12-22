import React from 'react';
import {
  Switch,
  Route,
} from 'react-router-dom';

import {
  PageLogin,
} from '../pages/auth';

const RoutePages = ({ path, ...props }) => (
  <Route path={path} {...props}>
    <Switch>
      <Route path={path} exact>
        <PageLogin />
      </Route>
    </Switch>
  </Route>
);

export default RoutePages;
