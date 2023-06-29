import React from 'react';

const CalDayOfWeek = ({ date, breakpoint = 'md' }) => (
  <>
    <span className={`d-none d-${breakpoint}-inline`}>
      {date.toFormat('ccc')}
    </span>
    <span className={`d-${breakpoint}-none`}>
      {date.toFormat('ccccc')}
    </span>
  </>
);

export default CalDayOfWeek;
