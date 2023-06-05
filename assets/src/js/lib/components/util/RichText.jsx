import React from 'react';

const urlRegex = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/;

const escapeRegExp = (str) => str
  .trim()
  .replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const RichText = ({
  children = '',
  multilines = true,
  links = false,
  highlight,
}) => {
  const markRegex = highlight
    && new RegExp(escapeRegExp(highlight), 'i');
  const markSplitRegex = highlight
    && new RegExp(`(${escapeRegExp(highlight)})`, 'i');
  let content = [children];

  const mark = (str) => str
    .split(markSplitRegex)
    .map((s, i) => (
      s.match(markRegex) ? <mark key={`mark-${i}`}>{s}</mark> : s
    ));

  if (multilines) {
    content = content.flatMap((c) => (
      c
        .split(/(\n)/)
        .map((s, i) => (
          s === '\n' ? <br key={`br-${i}`} /> : s
        ))
    ));
  }

  if (links) {
    content = content.flatMap((c, ci) => {
      if (typeof c !== 'string') return [c];

      const ss = c.split(/(\s)/);
      const o = [];

      ss.forEach((s, i) => {
        const last = o.length - 1;

        if (s.match(urlRegex)) {
          o.push(
            <a
              key={`a-${ci}-${i}`}
              href={s}
              target="_blank"
              rel="noreferrer"
            >
              {highlight ? mark(s) : s}
            </a>,
          );
        } else if (typeof o[last] === 'string') {
          o[last] = `${o[last]}${s}`;
        } else {
          o.push(s);
        }
      });

      return o;
    });
  }

  if (highlight) {
    content = content.flatMap((c) => {
      if (typeof c !== 'string') return [c];

      return mark(c);
    });
  }

  return content;
};

export default RichText;
