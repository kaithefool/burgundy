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
    <Router basename="/admin/">
      <Nav className="col-auto vh-100 sticky-top border-end py-3" />
      <div className="col bg-light">
        <Alert className="m-3 position-fixed top-0 end-0">
          <Routes>
            <Route path="*" element={<AppRoutes />} />
          </Routes>
        </Alert>
      </div>
    </Router>
  </div>
);

export default Admin;
