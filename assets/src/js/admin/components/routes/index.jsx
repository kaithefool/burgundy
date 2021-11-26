import React from 'react';
import { Routes, Route } from 'react-router-dom';

import PageClient from '../pages/PageClient';
import PageClients from '../pages/PageClients';
import PageAdmins from '../pages/PageAdmins';
import PageAdmin from '../pages/PageAdmin';
import PageUsers from '../pages/PageUsers';

const AppRoutes = () => (
  <Routes>
    <Route path="users" element={<PageUsers />} />
    <Route path="users/admins" element={<PageAdmins />} />
    <Route path="users/admins/:_id" element={<PageAdmin />} />
    <Route path="users/clients" element={<PageClients />} />
    <Route path="users/clients/:_id" element={<PageClient />} />
  </Routes>
);

export default AppRoutes;
