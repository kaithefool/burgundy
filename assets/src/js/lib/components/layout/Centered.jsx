import React from 'react';

const Centered = ({
  children,
  size = 'md',
}) => {
  const s = ({
    sm: 300,
    md: 500,
    lg: 800,
    xl: 1140,
  })[size] || size;

  return (
    <div className="d-flex h-100">
      <div
        className="m-auto mw-100"
        style={s && { width: `${s}px` }}
      >
        {children}
      </div>
    </div>
  );
};

export default Centered;
