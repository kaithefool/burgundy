import React from 'react';
import {
  Switch,
  Route,
} from 'react-router-dom';

import PagePages from '../pages/pages/PagePages.jsx';

const RoutePages = ({ path, ...props }) => (
  <Route path={path} {...props}>
    <Switch>
      <Route path={path} exact>
        <PagePages />
      </Route>
      <Route path={`${path}/:id`}>

      </Route>
    </Switch>
  </Route>
);

export default RoutePages;
