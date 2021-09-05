import React from 'react';

import Dir from './dir';

const FilsInput = ({
  children,
  ...props
}) => (
  <Dir
    {...props}
  >
    <Dir.Drop>
      <Dir.Click>
        {children}
      </Dir.Click>
    </Dir.Drop>
  </Dir>
);

export default FilsInput;
