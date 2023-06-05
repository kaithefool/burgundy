import React from 'react';

import useCal from './useCal';

const CalHeader = () => {
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

  return (
    <>
      <span className="d-none d-md-inline">
        {long}
      </span>
      <span className="d-inline d-md-none">
        {short}
      </span>
    </>
  );
};

export default CalHeader;
