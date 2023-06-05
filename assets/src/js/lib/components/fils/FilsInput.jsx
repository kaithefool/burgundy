import React from 'react';

import Dir from './dir';

const FilsInput = ({
  children,
  ...props
}) => (
  <Dir
    {...props}
  >
    <Dir.Drop className="position-absolute w-100 h-100 top-0 start-0">
      <Dir.Click
        className="position-absolute w-100 h-100"
        alwaysEnable
      >
        {children}
      </Dir.Click>
    </Dir.Drop>
  </Dir>
);

export default FilsInput;
