import React from 'react';
import {
  BrowserRouter as Router,
} from 'react-router-dom';

import Nav from './layout/Nav';
import Routes from './routes';

const Admin = () => (
  <div className="row g-0">
    <Router>
      <Nav className="col-auto vh-100 sticky-top border-end py-3" />
      <div className="col p-4 bg-light">
        <Routes />
      </div>
    </Router>
  </div>
);

export default Admin;
