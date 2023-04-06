import React from 'react';

import useCal from './useCal';

const CalHeader = () => {
  const { query: { view, date } } = useCal();
  let format = 'MMMM yyyy';

  if (view === 'week') format = 'MMMM WW yyyy';

  return (
    <h2>
      {date.toFormat(format)}
    </h2>
  );
};

export default CalHeader;
