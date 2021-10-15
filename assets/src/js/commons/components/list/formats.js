import { DateTime } from 'luxon';

export default {
  datetime: (v) => (
    v
      ? DateTime
        .fromISO(v)
        .toLocaleString(DateTime.DATETIME_MED)
      : ''),
  date: (v) => (
    v
      ? DateTime
        .fromISO(v)
        .toLocaleString(DateTime.DATE_MED)
      : ''),
  fromNow: (v) => (
    v
      ? DateTime
        .fromISO(v)
        .toRelative()
      : ''),
};
