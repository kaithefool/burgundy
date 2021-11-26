import React from 'react';
import {
  Routes, Route,
} from 'react-router-dom';

import {
  PageLogin,
} from '../pages/auth';

const RoutesAuth = () => (
  <Routes>
    <Route path="/" element={<PageLogin />} />
  </Routes>
);

export default RoutesAuth;
