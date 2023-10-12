import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

import Alert from '~/lib/components/alert';
import Mine from '~/shared/components/mine';
import AppRoutes from './routes';
import NavMain from './layout/NavMain';
import Head from './layout/Head';

const Admin = () => (
  <Mine>
    <div className="row g-0">
      <Router>
        <NavMain className="col-12 col-md-auto" />
        <div className="col-12 col-md">
          <Alert className="m-3 position-fixed top-0 end-0">
            <Head />
            <Routes>
              <Route path="/admin/*" element={<AppRoutes />} />
            </Routes>
          </Alert>
        </div>
      </Router>
    </div>
  </Mine>
);

export default Admin;
