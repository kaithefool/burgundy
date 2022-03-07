import pick from 'lodash/pick';

import { recursiveMap } from '../../helpers';
import { newKey } from '../../hooks/useUniqKey';

function initArrayItem(item) {
  // array need unique keys for list and sorting
  return typeof item === 'object'
    ? { ...item, key: newKey() }
    : item;
}

function initValues(defaults, stored = {}) {
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
      // array
      if (Array.isArray(val)) {
        return val.map((item) => initArrayItem(item));
      }

      return val;
    },
  );

  // only includes props the form uses
  return pick(values, Object.keys(defaults));
}

export {
  initArrayItem,
  initValues,
};
