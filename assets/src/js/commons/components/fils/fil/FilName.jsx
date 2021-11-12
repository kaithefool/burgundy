import React from 'react';

import useFil from './useFil';

const FilName = ({
  className = 'link-dark',
}) => {
  const { file: { name = '', path } } = useFil();
  const [, n, ext] = name.match(/(.*?)(\.[^.]*)$/);

  return (
    <a
      className={className}
      target="_blank"
      href={`/uploads/${path}`}
      rel="noreferrer"
    >
      <div className="w-100 d-inline-flex flex-nowrap">
        <div
          className="text-truncate"
          style={{ flex: '0 1 content' }}
        >
          {n}
        </div>
        <div
          style={{
            flex: '1 0 content',
            whiteSpace: 'nowrap',
          }}
        >
          {ext}
        </div>
      </div>
    </a>
  );
};

export default FilName;
