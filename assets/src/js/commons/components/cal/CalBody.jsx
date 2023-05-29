import React from 'react';

import useCal from './useCal';

import CalMonth from './CalMonth';
import CalWeek from './CalWeek';
import CalDay from './CalDay';

const vv = {
  month: CalMonth,
  week: CalWeek,
  day: CalDay,
};

const CalBody = (props) => {
  const { views, query: { view } } = useCal();

  if (!views.includes(view)) return '';

  const CalView = vv[view];

  return <CalView {...props} />;
};

export default CalBody;
