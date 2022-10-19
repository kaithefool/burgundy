import React from 'react';
import {
  Routes, Route,
} from 'react-router-dom';

import PageLogin from '../pages/auth/PageLogin';
import PagePwdResetMail from '../pages/auth/PagePwdResetMail';
import PagePwdResetMailSuccess from '../pages/auth/PagePwdResetMailSuccess';
import PagePwdReset from '../pages/auth/PagePwdReset';
import PagePwdResetSuccess from '../pages/auth/PagePwdResetSuccess';
import PageRegister from '../pages/auth/PageRegister';
import PageRegisterVerify from '../pages/auth/PageRegisterVerify';

const RoutesAuth = () => (
  <Routes>
    <Route path="" element={<PageLogin />} />
    <Route path="pwd-recovery" element={<PagePwdResetMail />} />
    <Route path="pwd-recovery/sent" element={<PagePwdResetMailSuccess />} />
    <Route path="pwd-recovery/v/:key" element={<PagePwdReset />} />
    <Route path="pwd-recovery/success" element={<PagePwdResetSuccess />} />
    <Route path="register" element={<PageRegister />} />
    <Route path="register/v/:key" element={<PageRegisterVerify />} />
  </Routes>
);

export default RoutesAuth;
