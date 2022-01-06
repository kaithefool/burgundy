import React from 'react';
import { useNavigate } from 'react-router-dom';

import TabsContext from './TabsContext';

const TabsProvider = ({
  children,
}) => {
  const { navigate } = useNavigate();

  const value = {};

  return (
    <TabsContext value={value}>
      {typeof children === 'function' ? children(value) : children}
    </TabsContext>
  );
};

export default TabsProvider;
