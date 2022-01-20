import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import PageAccessLogs from './pages/PageAccessLogs';
import PageViews from './pages/PageViews';
import PageView from './pages/PageView';
import PageClient from './pages/PageClient';
import PageClients from './pages/PageClients';
import PageAdmins from './pages/PageAdmins';
import PageAdmin from './pages/PageAdmin';
import PageUsers from './pages/PageUsers';
import Error from '~/commons/components/util/Error';

const AppRoutes = () => (
  <Routes>
    <Route
      path="settings"
      element={<Navigate to="/admin/settings/views" replace />}
    />
    <Route path="settings/views" element={<PageViews />} />
    <Route path="settings/views/:_id" element={<PageView />} />
    <Route path="settings/access-logs" element={<PageAccessLogs />} />

    <Route path="users" element={<PageUsers />} />
    <Route path="users/admins" element={<PageAdmins />} />
    <Route path="users/admins/:_id" element={<PageAdmin />} />
    <Route path="users/clients" element={<PageClients />} />
    <Route path="users/clients/:_id" element={<PageClient />} />
    <Route path="users/clients/:_id/:tab" element={<PageClient />} />

    {/* homepage and not found page */}
    <Route path="/" element={<Navigate to="/admin/users" replace />} />
    <Route path="*" element={<Error />} />
  </Routes>
);

export default AppRoutes;
