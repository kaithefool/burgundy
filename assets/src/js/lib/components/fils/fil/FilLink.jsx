import React from 'react';

import useFil from './useFil';

export const fileLink = (file, blob = false) => {
  if (blob && file instanceof File) {
    // blob
    return URL.createObjectURL(file);
  } if (file.path.match('/')) {
    // url
    return file.path;
  }
  // uploads
  return `/uploads/${file.path}`;
};

const FilLink = ({
  children,
  ...props
}) => {
  const { file } = useFil();
  const { name = '', type } = file;

  return (
    <a
      target="_blank"
      rel="noreferrer"
      href={fileLink(file)}
      {...!type.match(/^cloud\//) && { download: name }}
      {...props}
    >
      {children}
    </a>
  );
};

export default FilLink;
