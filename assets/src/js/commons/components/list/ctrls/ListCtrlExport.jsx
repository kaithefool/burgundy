import React from 'react';
import qs from 'qs';
import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons/faDownload';

const ListCtrlExport = ({ api, filter, opts: href }) => {
  const query = Object.keys(filter).length
    ? `?${qs.stringify({ filter })}`
    : '';
  const path = typeof href === 'string' ? href : `${api}/export`;

  return (
    <a
      className="btn btn-primary"
      href={`${path}${query}`}
    >
      <FA icon={faDownload} fixedWidth />
    </a>
  );
};

export default ListCtrlExport;
