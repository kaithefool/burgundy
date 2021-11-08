import React from 'react';

import useFil from './useFil';

const FilName = ({
  className = 'text-truncate',
}) => {
  const { file: { name = '' } } = useFil();

  return (
    <div className={className}>
      {name}
    </div>
  );
};

export default FilName;
