import React from 'react';

import Header from './Header.jsx';

const Page = ({
  header,
  children,
}) => (
  <div className="d-flex flex-column">
    {header && (
      <Header {...header} />
    )}
    {children}
  </div>
);

export default Page;
