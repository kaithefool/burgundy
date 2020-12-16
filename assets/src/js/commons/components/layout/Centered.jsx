import React from 'react';

const Centered = ({
  children,
}) => (
  <div className="d-flex vh-100">
    <div className="my-auto w-100">
      <div className="container">
        <div className="row justify-content-center">
          {children}
        </div>
      </div>
    </div>
  </div>
);

export default Centered;
