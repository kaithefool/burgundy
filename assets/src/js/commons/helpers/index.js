import mapValues from 'lodash/mapValues';
import isPlainObject from 'lodash/isPlainObject';

import sanitize, { defaults } from 'sanitize-html';
import meta from './meta';
import env from '../config/env';

export { meta };

export function sanitizeHtml(html) {
  return sanitize(html, {
    allowedTags: [
      ...defaults.allowedTags,
      'img', 'iframe',
    ],
    allowedAttributes: {
      '*': ['style'],
      a: ['href', 'name', 'target'],
      img: ['src', 'width', 'height'],
      iframe: ['src', 'width', 'height', 'frameborder', 'allowfullscreen'],
    },
    allowedStyles: {
      '*': {
        color: [
          /^#(0x)?[0-9a-f]+$/i,
          /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/,
        ],
        'text-align': [/^left$/, /^right$/, /^center$/, /^justify$/],
        width: [/^\d+(px|%)$/],
        height: [/^\d+(px|%)$/],
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
