import React from 'react';

import Header from './Header.jsx';

const Page = ({
  header,
  children,
}) => (
  <div>
    {header && (
      <Header {...header} />
    )}
    {children}
  </div>
);

export default Page;
