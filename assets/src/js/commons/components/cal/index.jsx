import React from 'react';

import CalContext from './CalContext';
import CalProvider from './CalProvider';
import useCal from './useCal';
import CalTitle from './CalTitle';
import CalMonth from './CalMonth';
import CalArrows from './CalArrows';

const Cal = (props) => <CalProvider {...props} />;

export {
  CalContext,
  CalProvider,
  useCal,
  CalTitle,
  CalMonth,
  CalArrows,
};

Cal.CalProvider = CalProvider;
Cal.Title = CalTitle;
Cal.Month = CalMonth;
Cal.Arrows = CalArrows;

export default Cal;
