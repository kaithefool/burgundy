import React from 'react';

import useFil from './useFil';

export const fileLink = (file, blob = false) => {
  if (blob && file instanceof File) {
    // blob
    return URL.createObjectURL(file);
  }
  if (file.path) {
    return file.path.match('/')
      ? file.path // url
      : `/uploads/${file.path}`; // uploads
  }

  return null;
};

const FilLink = ({
  children,
  ...props
}) => {
  const { file } = useFil();
  const { name = '', type } = file;
  const link = fileLink(file);

  if (!link) return children;

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
