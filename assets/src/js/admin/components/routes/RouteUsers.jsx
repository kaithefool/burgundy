import React from 'react';
import {
  Switch,
  Route,
} from 'react-router-dom';

import PageUsers from '../pages/users/PageUsers.jsx';
import PageUser from '../pages/users/PageUser.jsx';

const RoutePages = ({ path, ...props }) => (
  <Route path={path} {...props}>
    <Switch>
      <Route
        exact
        path={path}
        component={PageUsers}
      />
      <Route
        path={`${path}/:id`}
        component={PageUser}
      />
    </Switch>
  </Route>
);

export default RoutePages;
