import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Error from '~/commons/components/util/Error';

import PageAccessLogs from './pages/PageAccessLogs';
import PageViews from './pages/PageViews';
import PageView from './pages/PageView';
import PageUsers from './pages/PageUsers';
import PageUser from './pages/PageUser';
import PageExample from './pages/PageExample';

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
    <Route path="users/role/:role" element={<PageUsers />} />
    <Route path="users/:_id" element={<PageUser />} />
    <Route path="users/role/:role/:_id" element={<PageUser />} />

    {/* showcase of all form field types */}
    <Route path="example" element={<PageExample />} />
    <Route path="example/:tab" element={<PageExample />} />

    {/* homepage and not found page */}
    <Route path="/" element={<Navigate to="/admin/users" replace />} />
    <Route path="*" element={<Error />} />
  </Routes>
);

export default AppRoutes;
