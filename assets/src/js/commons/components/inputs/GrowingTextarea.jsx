import React, { useEffect, useRef } from 'react';

import useEventListener from '../../hooks/useEventListener';

function pxToNum(px) {
  return parseInt(px.replace('px', ''), 10);
}

const GrowingTextarea = ({
  maxRows,
  autoFocus,
  ...props
}) => {
  const elRef = useRef();

  const rowsToHeight = (rows) => {
    const el = elRef.current;
    const style = window.getComputedStyle(el);
    let h = 0;

    h += rows * pxToNum(style.lineHeight);
    h += pxToNum(style.paddingTop);
    h += pxToNum(style.paddingBottom);
    h += pxToNum(style.borderTopWidth);
    h += pxToNum(style.borderBottomWidth);

    return h;
  };

  const resize = () => {
    const el = elRef.current;

    el.style.height = '0';

    let h = el.scrollHeight;

    if (maxRows) {
      const maxH = rowsToHeight(maxRows);

      h = Math.min(h, maxH);
    }

    el.style.height = `${h}px`;
  };

  // resize on changes
  useEventListener(window, 'resize', () => resize());
  useEffect(() => resize());

  // auto focus
  useEffect(() => {
    if (autoFocus) elRef.current.focus();
  }, []);

  return (
    <textarea
      {...props}
      ref={elRef}
    />
  );
};

export default GrowingTextarea;
