import React from 'react';

const Circle = ({
  text,
  children,
  className,
  ...props
}) => (
  <div
    className={`
      rounded-circle overflow-hidden
      ratio ratio-1x1
      ${className}
    `}
    {...props}
  >
    {children}
    {text && (
    <div className="w-auto h-auto top-50 start-50 translate-middle">
      <div className="lh-1">
        {text}
      </div>
    </div>
    )}
  </div>
);

export default Circle;
