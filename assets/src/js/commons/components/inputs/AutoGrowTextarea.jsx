import React, { useEffect, useRef } from 'react';

import useEventListener from '../../hooks/useEventListener';

function pxToNum(px) {
  return parseFloat(px.replace('px', ''), 10);
}

const computeHeight = (el, maxRows) => {
  const style = window.getComputedStyle(el);

  // shrink el to get scroll height
  el.style.height = '0';

  let { scrollHeight } = el;

  // scrollHeight is rounded to an integer
  scrollHeight += 1;

  // scrollHeight doesn't include border by default
  // compensate it when box-sizing = border-box;
  scrollHeight += pxToNum(style.borderTopWidth);
  scrollHeight += pxToNum(style.borderBottomWidth);

  if (!maxRows) return scrollHeight;

  let h = maxRows * pxToNum(style.lineHeight);

  h += pxToNum(style.paddingTop);
  h += pxToNum(style.paddingBottom);
  h += pxToNum(style.borderTopWidth);
  h += pxToNum(style.borderBottomWidth);

  return Math.min(scrollHeight, h);
};

const AutoGrowTextarea = ({
  maxRows,
  styleProp = {},
  ...props
}) => {
  const elRef = useRef();

  const resize = () => {
    const el = elRef.current;

    el.style.height = `${
      computeHeight(elRef.current, maxRows)
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
