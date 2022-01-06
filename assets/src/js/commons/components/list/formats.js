import { DateTime as dt } from 'luxon';
import truncate from 'lodash/truncate';

export default {
  datetime: (v) => (
    v ? dt.fromISO(v).toLocaleString(dt.DATETIME_MED) : ''
  ),
  date: (v) => (
    v ? dt.fromISO(v).toLocaleString(dt.DATE_MED) : ''
  ),
  time: (v) => (
    v ? dt.fromISO(v).toLocaleString(dt.TIME_SIMPLE) : ''
  ),
  fromNow: (v) => (
    v ? dt.fromISO(v).toRelative() : ''
  ),
  truncate: (v) => truncate(v, { length: 25 }),
};
