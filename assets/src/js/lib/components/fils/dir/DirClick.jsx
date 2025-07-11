import React, { useRef } from 'react';

import useDir from './useDir';

const DirClick = ({
  className = '',
  children,
  alwaysEnable = false,
  ...props
}) => {
  const input = useRef();
  const {
    push, accept, multiple, files, disabled,
  } = useDir();

  if (!alwaysEnable && !multiple && files.length) return '';
  if (disabled) return <div className={className}>{children}</div>;

  return (
    <div
      className={`${className} cursor-pointer`}
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
          onChange={(e) => {
            push(e.target.files);
            // clear input to allow re-upload of the same file
            e.target.value = '';
          }}
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
