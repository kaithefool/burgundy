import React from 'react';
import { Navigate } from 'react-router-dom';
import castArray from 'lodash/castArray';

import env from '../../config/env';

const ProtectedRoute = ({
  roles,
  children,
}) => {
  if (!env.user) {
    // should set redirect cookie and explain why to user?
    return <Navigate to="/auth" replace />;
  }
  if (roles && !castArray(roles).includes(env.user.role)) {
    // should display unauthorized page?
  }

  return children;
};

export default ProtectedRoute;
