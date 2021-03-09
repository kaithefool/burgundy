import React, { useState, useRef } from 'react';

import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';
import { faFileUpload } from '@fortawesome/free-solid-svg-icons/faFileUpload';

const FileDrop = ({
  children,
  className,
  onDrop = () => {},
}) => {
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

        onDrop(files);
      }}
    >
      {children}
      {backdrop && (
        <div className="file-drop">
          <div className="pos-abs-center text-white display-4">
            <FA icon={faFileUpload} />
          </div>
        </div>
      )}
    </div>
  );
};

export default FileDrop;
