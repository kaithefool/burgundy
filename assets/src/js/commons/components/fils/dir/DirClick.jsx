import React, { useRef } from 'react';

import useDir from './useDir';

const DirClick = ({
  className = '',
  children,
  ...props
}) => {
  const input = useRef();
  const {
    push, accept, multiple, files,
  } = useDir();

  if (!multiple && files.length) return '';

  return (
    <div
      className={className}
      onClick={(e) => {
        if (e.target !== input.current) {
          e.preventDefault();
          input.current.click();
        }
      }}
    >
      {children}
      <div className="position-relative opacity-0 overflow-hidden">
        <input
          ref={input}
          type="file"
          onChange={(e) => push(e.target.files)}
          className="position-absolute"
          autoComplete="off"
          {...multiple && { multiple: true }}
          {...accept && { accept }}
          {...props}
        />
      </div>
    </div>
  );
};

export default DirClick;
