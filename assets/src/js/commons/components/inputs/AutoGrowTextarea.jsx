import React, { useEffect, useRef } from 'react';

import useEventListener from '../../hooks/useEventListener';

function pxToNum(px) {
  return parseFloat(px.replace('px', ''), 10);
}

const rowsToHeight = (style, rows) => {
  let h = rows * pxToNum(style.lineHeight);

  h += pxToNum(style.paddingTop);
  h += pxToNum(style.paddingBottom);
  h += pxToNum(style.borderTopWidth);
  h += pxToNum(style.borderBottomWidth);

  return h;
};

const computeHeight = (el, {
  maxRows,
  minRows,
} = {}) => {
  const style = window.getComputedStyle(el);

  // shrink el to get scroll height
  el.style.height = '0';

  let { scrollHeight } = el;

  // scrollHeight is rounded to an integer
  scrollHeight += 1;

  // scrollHeight doesn't include border by default
  if (style.boxSizing === 'border-box') {
    scrollHeight += pxToNum(style.borderTopWidth);
    scrollHeight += pxToNum(style.borderBottomWidth);
  }

  if (!maxRows && !minRows) return scrollHeight;

  let h = scrollHeight;

  if (maxRows) {
    h = Math.min(h, rowsToHeight(style, maxRows));
  }
  if (minRows) {
    h = Math.max(h, rowsToHeight(style, minRows));
  }

  return h;
};

const AutoGrowTextarea = ({
  maxRows,
  minRows = 2, // visually indicates it's a textarea
  styleProp = {},
  ...props
}) => {
  const elRef = useRef();

  const resize = () => {
    const el = elRef.current;

    el.style.height = `${
      computeHeight(elRef.current, {
        maxRows,
        minRows,
      })
    }px`;
  };

  // resize on changes
  useEventListener(window, 'resize', () => resize());
  useEffect(() => resize());

  return (
    <textarea
      {...props}
      style={{
        resize: 'none',
        ...styleProp,
      }}
      ref={elRef}
    />
  );
};

export default AutoGrowTextarea;
