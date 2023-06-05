import React from 'react';

import AlertContext from './AlertContext';
import AlertItem from './AlertItem';
import AlertProvider from './AlertProvider';
import AlertStack from './AlertStack';
import useAlert from './useAlert';

export {
  AlertContext,
  AlertItem,
  AlertProvider,
  AlertStack,
  useAlert,
};

const Alert = ({
  children,
  limit,
  ...props
}) => (
  <AlertProvider limit={limit}>
    <AlertStack {...props} />
    {children}
  </AlertProvider>
);

Alert.Context = AlertContext;
Alert.Item = AlertItem;
Alert.Provider = AlertProvider;
Alert.Stack = AlertStack;

export default Alert;
