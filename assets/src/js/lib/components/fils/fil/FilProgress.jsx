import React from 'react';

import useFil from './useFil';

const FilStatus = () => {
  const { http } = useFil();
  const { progress, status } = http.res;

  if (!status) return '';

  return (
    <div className="position-relative">
      <div
        className="bg-primary tra-width-3"
        style={{
          width: `${Math.round(progress * 100)}%`,
          height: '2px',
        }}
      />
    </div>
  );
};

export default FilStatus;
