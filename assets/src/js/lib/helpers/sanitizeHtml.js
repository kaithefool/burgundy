import sanitize, { defaults } from 'sanitize-html';

export default function sanitizeHtml(html) {
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
