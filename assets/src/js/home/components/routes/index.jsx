import React from 'react';
import { Routes, Route } from 'react-router-dom';

import RoutesAuth from './RoutesAuth';
import PageView from '../pages/PageView';

const HomeRoutes = () => (
  <Routes>
    <Route path="/auth/*" element={<RoutesAuth />} />
    <Route path="/*" element={<PageView />} />
  </Routes>
);

export default HomeRoutes;
