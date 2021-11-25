import React from 'react';
import {
  Routes,
  Route,
} from 'react-router-dom';

import {
  PageLogin,
} from '../pages/auth';

const RoutePages = ({ path, ...props }) => (
  <Route path={path} {...props}>
    <Routes>
      <Route path={path} exact>
        <PageLogin />
      </Route>
    </Routes>
  </Route>
);

export default RoutePages;
