import React from 'react';
import { Routes, Route } from 'react-router-dom';

import PageUsers from '../pages/PageUsers';
import PageUser from '../pages/PageUser';

const AppRoutes = () => (
  <Routes>
    <Route path="/users" element={<PageUsers />} />
    <Route path="/users/:_id" element={<PageUser />} />
  </Routes>
);

export default AppRoutes;
