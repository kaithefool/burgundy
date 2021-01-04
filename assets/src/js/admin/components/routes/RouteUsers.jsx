import React from 'react';
import {
  Switch,
  Route,
} from 'react-router-dom';

import PageUsers from '../pages/users/PageUsers.jsx';

const RoutePages = ({ path, ...props }) => (
  <Route path={path} {...props}>
    <Switch>
      <Route path={path} exact>
        <PageUsers />
      </Route>
      <Route path={`${path}/:id`}>

      </Route>
    </Switch>
  </Route>
);

export default RoutePages;
