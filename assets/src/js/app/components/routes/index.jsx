import React from 'react';
import { Routes, Route } from 'react-router-dom';

import RoutesAuth from './RoutesAuth';

export {
  RoutesAuth,
};

const AppRoutes = () => (
  <Routes>
    <Route path="/auth/*" element={<RoutesAuth />} />
  </Routes>
);

export default AppRoutes;
