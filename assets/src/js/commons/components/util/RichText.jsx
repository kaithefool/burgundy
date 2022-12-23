import React from 'react';

const urlRegex = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/;

const RichText = ({
  children = '',
  multilines = true,
  links = false,
}) => {
  let content = [children];

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
              {s}
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

  return content;
};

export default RichText;
