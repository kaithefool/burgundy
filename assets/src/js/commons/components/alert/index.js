import React from 'react';

import AlertContext from './AlertContext';
import AlertProvider from './AlertProvider.jsx';
import AlertStack from './AlertStack.jsx';
import useAlert from './useAlert';

export {
  AlertContext,
  AlertProvider,
  AlertStack,
  useAlert,
};

const Alert = (props) => <AlertProvider {...props} />;

Alert.Context = AlertContext;
Alert.Provider = AlertProvider;
Alert.Stack = AlertStack;

export default Alert;
