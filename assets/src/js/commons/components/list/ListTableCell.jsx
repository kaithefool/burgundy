import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import get from 'lodash/get';
import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';

import formats from './formats';

const ListTableCell = ({
  row,
  col: {
    key,
    getter = (v) => v,
    format,
  },
  rowLink,
}) => {
  const { i18n } = useTranslation();
  const value = get(row, key);
  let content = getter(value, row, format);

  if (typeof content === 'object') {
    content = i18n.pickLng(content);
  }
  if (format) {
    content = formats[format](content);
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
