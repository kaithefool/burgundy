import React from 'react';

import useCal from './useCal';

const CalHeader = () => {
  const { query: { view, date } } = useCal();
  let title = '';

  if (view === 'month') title = date.toFormat('MMMM yyyy');

  return (
    <h2>
      {title}
    </h2>
  );
};

export default CalHeader;
