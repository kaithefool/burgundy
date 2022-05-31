import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

import Nav from './layout/Nav';
import AppRoutes from './routes';
import Alert from '~/commons/components/alert';

const Admin = () => (
  <div className="row g-0">
    <Router>
      <Nav className="col-12 col-md-auto" />
      <div className="col-12 col-md">
        <Alert className="m-3 position-fixed top-0 end-0">
          <Routes>
            <Route path="/admin/*" element={<AppRoutes />} />
          </Routes>
        </Alert>
      </div>
    </Router>
  </div>
);

export default Admin;
