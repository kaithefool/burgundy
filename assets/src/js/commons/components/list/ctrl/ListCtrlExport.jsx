import React from 'react';
import qs from 'qs';
import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons/faDownload';

import useList from '../useList';

const ListCtrlExport = ({
  href,
  className = 'btn btn-link',
}) => {
  const { filter, api } = useList();
  const query = Object.keys(filter).length
    ? `?${qs.stringify({ filter })}`
    : '';
  const path = typeof href === 'string'
    ? href
    : `${api.url}/export`;

  return (
    <a
      className={className}
      href={`${path}${query}`}
    >
      <FA icon={faDownload} fixedWidth />
    </a>
  );
};

export default ListCtrlExport;
