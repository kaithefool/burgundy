import pick from 'lodash/pick';
import mapValues from 'lodash/mapValues';
import isPlainObject from 'lodash/isPlainObject';

import { newKey } from '../../hooks/useUniqKey';

function getPath(parent, key) {
  return [parent, key].filter(((p) => p || p === 0)).join('.');
}

function mapDeep(src, fn = (v) => v) {
  const t = (value, key, path) => {
    const p = path ?? key;
    const val = fn(value, key, p);

    if (isPlainObject(val)) {
      return mapValues(val, (v, k) => t(v, k, getPath(p, k)));
    }

    if (Array.isArray(val)) {
      return val.map((v, k) => t(v, k, getPath(p, k)));
    }

    return val;
  };

  return t(src);
}

function keyArrayItem(item) {
  // array need unique keys for list and sorting
  return typeof item === 'object'
    ? { ...item, key: newKey() }
    : item;
}

function keyArrayHelpers(helpers) {
  // array need unique keys for list and sorting
  return {
    ...helpers,
    push: (item) => helpers.push(keyArrayItem(item)),
    insert: (i, item) => helpers.insert(i, keyArrayItem(item)),
    unshift: (item) => helpers.unshift(keyArrayItem(item)),
    replace: (i, item) => helpers.replace(i, keyArrayItem(item)),
  };
}

function initValues(
  defaults,
  stored = {},
  relations = [],
) {
  // parse data into formik friendly format
  const values = mapDeep(
    { ...defaults, ...stored },
    (val, key, path) => {
      // relations
      if (relations.includes(path)) {
        if (Array.isArray(val)) {
          return val.map((item) => item?._id || item);
        }

        return val?._id || val;
      }
      // numbers
      if (typeof val === 'number') {
        return val.toString();
      }
      // null
      if (val === null) return '';
      // array
      if (Array.isArray(val)) {
        return val.map((item) => keyArrayItem(item));
      }

      return val;
    },
  );

  // only includes props the form uses
  return pick(values, Object.keys(defaults));
}

function parseValues(values, relations = []) {
  return mapDeep(values, (val, key, path) => {
    // mongoose only accepts null and valid ObjectId
    if (relations.includes(path)) {
      if (Array.isArray(val)) {
        return val.map((_id) => _id || null);
      }

      return val || null;
    }

    return val;
  });
}

export {
  keyArrayItem,
  keyArrayHelpers,
  initValues,
  parseValues,
  mapDeep,
};
