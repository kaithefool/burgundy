import React, { useRef } from 'react';

import useFiles from './useFiles';

const FilesClick = ({
  className = 'py-3 text-center',
  children,
  ...props
}) => {
  const input = useRef();
  const { push, accept } = useFiles();

  return (
    <div
      role="button"
      className={className}
      onClick={(e) => {
        if (e.target !== input.current) {
          e.preventDefault();
          input.current.click();
        }
      }}
    >
      {children || (
        <h6>
          Drag &amp; Drop your files or
          {' '}
          <u>Browse</u>
        </h6>
      )}
      <div className="position-relative opacity-0 overflow-hidden">
        <input
          ref={input}
          type="file"
          onChange={(e) => push(e.target.files)}
          className="position-absolute"
          autoComplete="off"
          {...accept && { accept }}
          {...props}
        />
      </div>
    </div>
  );
};

export default FilesClick;
