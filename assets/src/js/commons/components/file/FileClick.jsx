import React, { useRef } from 'react';

const FileClick = ({
  className,
  onFile = () => {},
  children,
  ...props
}) => {
  const input = useRef();

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
          onChange={(e) => onFile(e.target.files)}
          className="position-absolute"
          autoComplete="off"
          {...props}
        />
      </div>
    </div>
  );
};

export default FileClick;
