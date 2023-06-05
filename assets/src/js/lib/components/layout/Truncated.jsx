import React, {
  Fragment, useEffect, useState, useRef,
} from 'react';
import { useTranslation } from 'react-i18next';

import useObserver from '../../hooks/useObserver';

const Truncated = ({
  className = '',
  children,
  more = null,
  onMore = () => {},
  ...props
}) => {
  const { t } = useTranslation();
  const showMoreRef = useRef();
  const [limit, setLimit] = useState(-1);
  const onChange = (node) => {
    const { height } = node.getBoundingClientRect();
    const { height: moreH } = showMoreRef
      .current
      .getBoundingClientRect();
    const cc = Array
      .from(node.children)
      .filter((c) => c.getAttribute('data-btn') !== 'more');
    let ch = 0;
    let lim = -1;

    for (let i = 0; i < cc.length; i += 1) {
      const { height: h } = cc[i].getBoundingClientRect();

      if (ch + h >= height) {
        lim = ch + moreH > height ? i - 1 : i;
        break;
      }
      ch += h;
    }

    if (lim !== limit) {
      setLimit(lim);
    }
  };

  const { ref, el } = useObserver(
    'resize',
    (e, node) => onChange(node),
  );

  useEffect(() => {
    onChange(el.current);
  });

  const remaining = children.length - limit;
  const showMore = (p) => (
    <div
      className="position-absolute"
      data-btn="more"
      {...p}
    >
      {typeof more === 'function' ? more(remaining) : more}
      {!more && (
        <button
          type="button"
          className="btn btn-sm"
          onClick={() => onMore()}
        >
          {t('showMore')}
          {' '}
          {`(${remaining})`}
        </button>
      )}
    </div>
  );

  return (
    <div
      ref={ref}
      {...props}
      className={`overflow-hidden position-relative ${className}`}
    >
      {showMore({
        ref: showMoreRef,
        ...limit !== 0 && {
          style: { visibility: 'hidden' },
        },
      })}
      {children.map((c, i) => (
        <Fragment key={i}>
          <div
            {...limit >= 0 && i >= limit && {
              style: { visibility: 'hidden' },
            }}
          >
            {c}
          </div>
          {limit >= 0 && i === limit - 1 && showMore()}
        </Fragment>
      ))}
    </div>
  );
};

export default Truncated;
