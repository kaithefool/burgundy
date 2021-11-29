import React from 'react';
import {
  Routes, Route,
} from 'react-router-dom';

import PageLogin from '../pages/auth/PageLogin';
import PagePwdResetReq from '../pages/auth/PagePwdResetReq';
import PagePwdResetRes from '../pages/auth/PagePwdResetRes';

const RoutesAuth = () => (
  <Routes>
    <Route path="" element={<PageLogin />} />
    <Route path="pwd-recovery" element={<PagePwdResetReq />} />
    <Route path="pwd-recovery/sent" element={<PagePwdResetRes />} />
  </Routes>
);

export default RoutesAuth;
