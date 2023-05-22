import React from 'react';

import useFil from './useFil';

const FilLink = ({
  children,
  ...props
}) => {
  const { file: { name = '', path } } = useFil();

  return (
    <a
      target="_blank"
      href={`/uploads/${path}`}
      rel="noreferrer"
      download={name}
      {...props}
    >
      {children}
    </a>
  );
};

export default FilLink;
