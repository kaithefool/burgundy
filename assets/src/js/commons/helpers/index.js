import sanitize from 'sanitize-html';
import mapValues from 'lodash/mapValues';
import isPlainObject from 'lodash/isPlainObject';
import meta from './meta';
import env from '../config/env';

export { meta };

export function recursiveMap(src, fn = (v) => v) {
  const t = (value, key) => {
    const val = fn(value, key);

    if (isPlainObject(val)) {
      return mapValues(val, (v, k) => t(v, k));
    }

    if (Array.isArray(val)) return val.map((v) => t(v));

    return val;
  };

  return t(src);
}

export function sanitizeHtml(html) {
  return sanitize(html, {
    allowedAttributes: {
      '*': ['style'],
      a: ['href', 'name', 'target'],
      img: ['src'],
    },
    allowedStyles: {
      '*': {
        color: [
          /^#(0x)?[0-9a-f]+$/i,
          /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/,
        ],
        'text-align': [/^left$/, /^right$/, /^center$/, /^justify$/],
      },
    },
  });
}

export function resolvePath(...segments) {
  const { origin, pathname } = window.location;

  let url = new URL(`${origin}${pathname.replace(/\/$/, '')}/`);

  segments.forEach((s) => {
    url = new URL(s, url);
  });

  return url.pathname.replace(/\/$/, '');
}

export function reduceLng(value) {
  return env.lngs.reduce((obj, l, i) => ({
    ...obj,
    [l]: typeof value === 'function'
      ? value(l, env.lngLabels[i])
      : value,
  }), {});
}

export function mapLng(value) {
  return env.lngs.map((l, i) => (
    typeof value === 'function'
      ? value(l, env.lngLabels[i])
      : value
  ));
}
