import pick from 'lodash/pick';

import util from './path';

const dateRegex = /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/;

export default {
  initFormValues(defaults, stored = {}) {
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
};
