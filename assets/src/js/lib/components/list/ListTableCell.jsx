import React, { isValidElement } from 'react';
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
    link: colLink,
    format,
    cell,
  },
  rowLink,
}) => {
  const { i18n, t } = useTranslation();
  const value = get(row, key);
  let content = getter(value, row, format);
  const isElement = isValidElement(content);
  let link = colLink && typeof colLink !== 'boolean'
    ? colLink : rowLink;

  if (link && !(isElement && !colLink)) {
    link = typeof link === 'function' ? link(row) : link;
  } else {
    link = null;
  }

  if (cell) {
    return typeof cell === 'function'
      ? cell(value, row, format) : cell;
  }

  if (typeof content === 'object' && !isElement) {
    content = i18n.pickLng(content);
  }
  if (format) {
    content = formats[format](content);
  }
  if (typeof content === 'boolean') {
    content = <FA icon={content ? faCheck : faTimes} fixedWidth />;
  }
  if (typeof content === 'string') {
    content = t(content, content);
  }

  if (link) {
    content = <Link className="row-link" to={link}>{content}</Link>;
  }

  return (
    <td className={link ? 'link' : ''}>
      {content}
    </td>
  );
};

export default ListTableCell;
