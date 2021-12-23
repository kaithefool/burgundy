import React from 'react';
import { Link } from 'react-router-dom';
import get from 'lodash/get';
import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';

import formats from './formats';
import { pickLng } from '../../helpers';

const ListTableCell = ({
  row,
  col: {
    key,
    getter = (v, r, format) => (format ? formats[format](v) : v),
    format,
  },
  rowLink,
}) => {
  const value = get(row, key);

  let content = getter(value, row, format);

  if (typeof content === 'object') {
    content = pickLng(content);
  }
  if (typeof content === 'boolean') {
    content = <FA icon={content ? faCheck : faTimes} fixedWidth />;
  }

  if (rowLink) {
    const to = typeof rowLink === 'function' ? rowLink(row) : rowLink;

    content = <Link to={to}>{content}</Link>;
  }

  return (
    <td className={rowLink ? 'link' : ''}>
      {content}
    </td>
  );
};

export default ListTableCell;
