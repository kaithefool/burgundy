import React from 'react';

import CalContext from './CalContext';
import CalProvider from './CalProvider';
import useCal from './useCal';
import CalMonth from './CalMonth';

const Cal = (props) => <CalProvider {...props} />;

export {
  CalContext,
  CalProvider,
  useCal,
  CalMonth,
};

Cal.CalProvider = CalProvider;
Cal.Month = CalMonth;

export default Cal;
