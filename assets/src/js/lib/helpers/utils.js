import mapValues from 'lodash/mapValues';
import isPlainObject from 'lodash/isPlainObject';

import env from '../config/env';

export function searchRegex(keyword) {
  const str = keyword
    .trim()
    .replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  return new RegExp(str, 'i');
}

export function findDeep(src, fn, excludeId = true) {
  const t = (value) => {
    if (fn(value)) return true;

    if (isPlainObject(value)) {
      return Object.keys(value).find((k) => (
        !(excludeId && k === '_id') && fn(value[k])
      ));
    }
    if (Array.isArray(value)) {
      return value.find((v) => fn(v));
    }

    return false;
  };

  return t(src);
}

function getPath(parent, key) {
  return [parent, key].filter(((p) => p || p === 0)).join('.');
}

export function mapDeep(src, fn = (v) => v) {
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

export function allow(role) {
  return (Array.isArray(role) ? role : [role])
    .includes(env.user.role);
}
