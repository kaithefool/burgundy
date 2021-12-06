import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import PageViews from '../pages/PageViews';
import PageView from '../pages/PageView';
import PageClient from '../pages/PageClient';
import PageClients from '../pages/PageClients';
import PageAdmins from '../pages/PageAdmins';
import PageAdmin from '../pages/PageAdmin';
import PageUsers from '../pages/PageUsers';

const AppRoutes = () => (
  <Routes>

    <Route
      path="settings"
      element={
        <Navigate to="/admin/settings/views" replace />
      }
    />
    <Route path="settings/views" element={<PageViews />} />
    <Route path="settings/views/:_id" element={<PageView />} />

    <Route path="users" element={<PageUsers />} />
    <Route path="users/admins" element={<PageAdmins />} />
    <Route path="users/admins/:_id" element={<PageAdmin />} />
    <Route path="users/clients" element={<PageClients />} />
    <Route path="users/clients/:_id" element={<PageClient />} />
  </Routes>
);

export default AppRoutes;
