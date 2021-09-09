import React from 'react';
import {
  BrowserRouter as Router,
} from 'react-router-dom';

import Nav from './layout/Nav';
import Routes from './routes';

const Admin = () => (
  <div className="container-fluid">
    <div className="row">
      <Router>
        <Nav className="col-auto border-end" />
        <div className="col bg-light">
          <Routes />
        </div>
      </Router>
    </div>
  </div>
);

export default Admin;
