import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import useObserver from '../../hooks/useObserver';
import useList from './useList';

const ListTruncate = ({
  rows: optRows,
  children,
  className = '',
  expand: expandBtn,
  ...props
}) => {
  const { t } = useTranslation();

  // number of items the div (in init state) can contain without overflow
  const [limit, setLimit] = useState(0);
  // expanded status triggered by user action
  const [expanded, setExpanded] = useState(false);

  const { rows: listRows } = useList();
  const rows = optRows || listRows || [];

  let show = rows.length;

  if (expanded !== true && limit) {
    show = typeof expanded === 'number'
      ? Math.max(limit, expanded) : limit;
    show = Math.min(rows.length, show);
  }

  const remaining = rows.length - show;
  const expand = (v) => setExpanded(
    typeof v === 'number' ? show + v : true,
  );

  const onChange = (node) => {
    const { height: h } = node.getBoundingClientRect();
    const list = node.nextElementSibling;
    const toggle = list.nextElementSibling;
    const { scrollHeight: toggleH } = toggle;
    // sample item height
    // assuming every item has the same height
    const itemH = list.children?.[0]?.getBoundingClientRect()?.height || 0;

    // calculate limit
    const overflowed = rows.length * itemH > h;
    const l = overflowed ? Math.floor((h - toggleH) / itemH) : 0;

    if (l !== limit) {
      setLimit(l);
    }
  };

  const { ref, el } = useObserver('resize', (e, node) => onChange(node));

  useEffect(() => {
    onChange(el.current);
  });

  return (
    <>
      {/* invisible div for calculating height */}
      <div
        ref={ref}
        className={`position-absolute ${className}`}
        {...props}
      />
      {/* list */}
      <div>
        {rows.slice(0, show).map((r, i) => children(r, i))}
      </div>
      {/* expand toggle */}
      <div
        className="overflow-hidden"
        style={{ height: remaining ? 'auto' : 0 }}
      >
        {expandBtn ? (expandBtn({
          rows, limit, show, remaining, expand,
        })) : (
          <button
            type="button"
            className="btn"
            onClick={() => expand()}
          >
            {t('showMore')}
            {' '}
            {`(${remaining})`}
          </button>
        )}
      </div>
    </>
  );
};

export default ListTruncate;
