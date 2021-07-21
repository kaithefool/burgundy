import React from 'react';
import { Switch } from 'react-router-dom';

import RouteResource from './RouteResource';

import PageUsers from '../pages/users/PageUsers';
import PageUser from '../pages/users/PageUser';

const Routes = () => (
  <Switch>
    <RouteResource
      path="/admin/users"
      List={PageUsers}
      Doc={PageUser}
    />
  </Switch>
);

export default Routes;
