import React from 'react';

import Header from './Header';

const Page = ({
  header,
  children,
}) => (
  <div>
    {header !== null && (
      <Header {...header} />
    )}
    <div className="p-4">
      {children}
    </div>
  </div>
);

export default Page;
