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
  })[size];

  return (
    <div className="d-flex vh-100">
      <div className="my-auto w-100">
        <div className="container">
          <div className="row justify-content-center">
            <div
              className="col"
              style={s && { maxWidth: `${s}px` }}
            >
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Centered;
