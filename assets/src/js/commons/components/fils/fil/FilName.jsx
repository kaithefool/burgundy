import React from 'react';

import useFil from './useFil';

const FilName = ({
  className = 'text-truncate',
}) => {
  const { file: { name = '', path } } = useFil();

  return (
    <div className={className}>
      <a
        className="link-dark"
        target="_blank"
        href={`/uploads/${path}`}
        rel="noreferrer"
      >
        {name}
      </a>
    </div>
  );
};

export default FilName;
