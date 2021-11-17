import React, { useState, useRef } from 'react';

import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';
import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons/faCloudUploadAlt';

import useDir from './useDir';

const DirDrop = ({
  children,
  className = '',
}) => {
  const { push } = useDir();
  const [backdrop, setBackdrop] = useState(false);
  // account for dragging between parent and children
  const dragIn = useRef(0);

  return (
    <div
      className={className}
      onDragEnter={() => {
        dragIn.current += 1;
        if (!backdrop) setBackdrop(true);
      }}
      onDragLeave={() => {
        dragIn.current -= 1;
        if (dragIn.current === 0 && backdrop) setBackdrop(false);
      }}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault();
        setBackdrop(false);
        dragIn.current = 0;

        const { files } = e.dataTransfer;

        push(files);
      }}
    >
      {children}
      {backdrop && (
        <div style={{ zIndex: 1 }}>
          <div className="w-100 h-100 bg-dark opacity-75" />
          <div
            className={`
              text-white display-4
              position-absolute top-50 start-50 translate-middle
            `}
          >
            <FA icon={faCloudUploadAlt} />
          </div>
        </div>
      )}
    </div>
  );
};

export default DirDrop;
