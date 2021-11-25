import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom';

import {
  RouteAuth,
} from './routes';

const Auth = () => (
  <Router>
    <Routes>
      <RouteAuth path="/auth" />
    </Routes>
  </Router>
);

export default Auth;
