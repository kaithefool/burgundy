import React from 'react';
import {
  BrowserRouter as Router,
} from 'react-router-dom';

import HomeRoutes from './routes';

const Home = () => (
  <Router>
    <HomeRoutes />
  </Router>
);

export default Home;
