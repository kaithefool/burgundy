import React from 'react';

import AlertStack from './AlertStack.jsx';
import AlertStacker from './AlertStacker.jsx';

const Alert = ({
  max,
  ...props
}) => (
  <AlertStacker max={max}>
    <AlertStack {...props} />
  </AlertStacker>
);

export default Alert;
