import CalContext from './CalContext';
import CalProvider from './CalProvider';
import useCal from './useCal';
import CalTitle from './CalTitle';
import CalMonth from './CalMonth';
import CalWeek from './CalWeek';
import CalDay from './CalDay';
import CalTimeAxis from './CalTimeAxis';
import CalEventsAxis from './CalEventsAxis';
import CalEventsGrid from './CalEventsGrid';
import CalDayHeader from './CalDayHeader';
import CalArrows from './CalArrows';
import CalViewSwitch from './CalViewSwitch';
import CalDayOfWeek from './CalDayOfWeek';
import CalToday from './CalToday';
import CalHeader from './CalHeader';
import CalBody from './CalBody';
import CalEventTime from './CalEventTime';
import CalMiniMonth from './CalMiniMonth';

const Cal = CalProvider;

export {
  CalContext,
  CalProvider,
  useCal,
  CalTitle,
  CalMonth,
  CalWeek,
  CalDay,
  CalEventsAxis,
  CalEventsGrid,
  CalDayHeader,
  CalTimeAxis,
  CalArrows,
  CalViewSwitch,
  CalDayOfWeek,
  CalToday,
  CalHeader,
  CalBody,
  CalEventTime,
  CalMiniMonth,
};

Cal.CalProvider = CalProvider;
Cal.Title = CalTitle;
Cal.Month = CalMonth;
Cal.Week = CalWeek;
Cal.Day = CalDay;
Cal.EventsAxis = CalEventsAxis;
Cal.EventsGrid = CalEventsGrid;
Cal.DayHeader = CalDayHeader;
Cal.TimeAxis = CalTimeAxis;
Cal.Arrows = CalArrows;
Cal.ViewSwitch = CalViewSwitch;
Cal.DayOfWeek = CalDayOfWeek;
Cal.Today = CalToday;
Cal.Header = CalHeader;
Cal.Body = CalBody;
Cal.EventTime = CalEventTime;
Cal.MiniMonth = CalMiniMonth;

export default Cal;
