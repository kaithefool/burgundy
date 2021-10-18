import { DateTime as dt } from 'luxon';

export default {
  datetime: (v) => (
    v ? dt.fromISO(v).toLocaleString(dt.DATETIME_MED) : ''
  ),
  date: (v) => (
    v ? dt.fromISO(v).toLocaleString(dt.DATE_MED) : ''
  ),
  fromNow: (v) => (
    v ? dt.fromISO(v).toRelative() : ''
  ),
};
