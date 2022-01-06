import React from 'react';
import TabPane from 'react-bootstrap/TabPane';
import useTabs from './useTabs';

const Tab = (props) => {
  useTabs(props);

  return <TabPane {...props} />;
};

export default Tab;
