import mapValues from 'lodash/mapValues';
import isPlainObject from 'lodash/isPlainObject';

export default {
  recursiveMap(src, fn = (v) => v) {
    const t = (value, key) => {
      const val = fn(value, key);

      if (isPlainObject(val)) {
        return mapValues(val, (v, k) => t(v, k));
      }

      if (Array.isArray(val)) return val.map((v) => t(v));

      return val;
    };

    return t(src);
  },
};
