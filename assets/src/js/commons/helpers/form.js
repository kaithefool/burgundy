import pick from 'lodash/pick';
import mimer from 'mimer';

import util from './util';

const dateRegex = /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/;

const toMimes = (accept) => (
  accept
    .split(',')
    .map((a) => a.trim())
    .map((a) => (a.includes('/') ? a : mimer(a)))
);

export default {
  initValues(defaults, stored = {}) {
    // parse data into formik friendly format
    const values = util.recursiveMap(
      { ...defaults, ...stored },
      (val) => {
        // formik doesn't support numbers very well
        if (typeof val === 'number') {
          return val.toString();
        }
        // dates
        if (typeof val === 'string' && val.match(dateRegex)) {
          return new Date(val);
        }

        return val;
      },
    );

    // only includes props the form uses
    return pick(values, Object.keys(defaults));
  },

  toMimes,

  validateFolder(filesList, {
    accept,
    maxSize,
  } = {}) {
    const files = Array.from(filesList);

    // check the files' size
    if (
      maxSize
      && files.find((f) => f.size > maxSize)
    ) {
      return 'maxSize';
    }
    // check acceptable files' types
    if (accept) {
      const mimes = toMimes(accept);

      if (!files.find((f) => mimes.includes(f.type))) {
        return 'accept';
      }
    }

    return null;
  },
};
