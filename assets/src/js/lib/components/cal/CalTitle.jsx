import React from 'react';

import useCal from './useCal';

const CalTitle = ({
  breakpoint,
}) => {
  const { query: { view, date }, grid } = useCal();
  let long = '';
  let short = '';

  // month
  if (view === 'month') {
    long = date.toFormat('LLLL yyyy');
    short = date.toFormat('LLL yyyy');
  }
  // week
  if (view === 'week') {
    const { 0: s, 6: e } = grid;

    if (s.month !== e.month) {
      long = `${s.toFormat('MMMM')} - ${e.toFormat('LLLL yyyy')}`;
      short = `${s.toFormat('MMM')} - ${e.toFormat('LLL yyyy')}`;
    } else {
      long = s.toFormat('LLLL yyyy');
      short = s.toFormat('LLL yyyy');
    }
  }
  // day
  if (view === 'day') {
    long = date.toFormat('DDD');
    short = date.toFormat('DD');
  }

  if (!breakpoint) return long;

  return (
    <>
      <span className={`d-none d-${breakpoint}-inline`}>
        {long}
      </span>
      <span className={`d-inline d-${breakpoint}-none`}>
        {short}
      </span>
    </>
  );
};

export default CalTitle;
