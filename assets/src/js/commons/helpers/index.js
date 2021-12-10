import sanitize from 'sanitize-html';
import mapValues from 'lodash/mapValues';
import isPlainObject from 'lodash/isPlainObject';
import meta from './meta';

function recursiveMap(src, fn = (v) => v) {
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

function sanitizeHtml(html) {
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

function resolvePath(...segments) {
  const { origin, pathname } = window.location;

  let url = new URL(`${origin}${pathname.replace(/\/$/, '')}/`);

  segments.forEach((s) => {
    url = new URL(s, url);
  });

  return url.pathname.replace(/\/$/, '');
}

export {
  recursiveMap,
  sanitizeHtml,
  resolvePath,
  meta,
};
