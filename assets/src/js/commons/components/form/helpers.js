import pick from 'lodash/pick';

import { recursiveMap } from '../../helpers';

export function initValues(defaults, stored = {}) {
  // parse data into formik friendly format
  const values = recursiveMap(
    { ...defaults, ...stored },
    (val) => {
      // formik doesn't support numbers very well
      if (typeof val === 'number') {
        return val.toString();
      }
      // null
      if (val === null) return '';

      return val;
    },
  );

  // only includes props the form uses
  return pick(values, Object.keys(defaults));
}
