import React from 'react';

import CalContext from './CalContext';
import CalProvider from './CalProvider';
import useCal from './useCal';
import CalTitle from './CalTitle';
import CalMonth from './CalMonth';
import CalWeek from './CalWeek';
import CalTimeAxis from './CalTimeAxis';
import CalArrows from './CalArrows';
import CalViewSwitch from './CalViewSwitch';
import CalDayOfWeek from './CalDayOfWeek';

const Cal = (props) => (
  <CalProvider {...props}>
    <div className="row align-items-center my-3">
      <div className="col">
        <h5 className="m-0"><Cal.Title /></h5>
      </div>
      <div className="col-auto">
        <Cal.Arrows />
      </div>
      <div className="col-auto">
        <Cal.ViewSwitch />
      </div>
    </div>
    <Cal.Month />
    <Cal.Week />
  </CalProvider>
);

export {
  CalContext,
  CalProvider,
  useCal,
  CalTitle,
  CalMonth,
  CalWeek,
  CalTimeAxis,
  CalArrows,
  CalViewSwitch,
  CalDayOfWeek,
};

Cal.CalProvider = CalProvider;
Cal.Title = CalTitle;
Cal.Month = CalMonth;
Cal.Week = CalWeek;
Cal.TimeAxis = CalTimeAxis;
Cal.Arrows = CalArrows;
Cal.ViewSwitch = CalViewSwitch;
Cal.DayOfWeek = CalDayOfWeek;

export default Cal;
