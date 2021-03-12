import React from 'react';

import AlertContext from './AlertContext';
import AlertItem from './AlertItem.jsx';
import AlertProvider from './AlertProvider.jsx';
import AlertStack from './AlertStack.jsx';
import useAlert from './useAlert';

export {
  AlertContext,
  AlertItem,
  AlertProvider,
  AlertStack,
  useAlert,
};

const Alert = ({ children, ...props }) => (
  <AlertProvider {...props}>
    <AlertStack />
    {children}
  </AlertProvider>
);

Alert.Context = AlertContext;
Alert.Item = AlertItem;
Alert.Provider = AlertProvider;
Alert.Stack = AlertStack;

export default Alert;
