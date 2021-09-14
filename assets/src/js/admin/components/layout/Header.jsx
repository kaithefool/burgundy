import React from 'react';
import { Link } from 'react-router-dom';

import path from '~/commons/helpers/path';

const Header = ({
  title,
  breadcrumb,
}) => (
  <header className="mt-4">
    {breadcrumb && (
      <nav>
        <div className="breadcrumb">
          {breadcrumb.map(({ to, ...b }, i) => (
            <div key={i} className="breadcrumb-item">
              <Link to={path.resolve(to)} {...b} />
            </div>
          ))}
        </div>
      </nav>
    )}
    {title && (
      <h1>{title}</h1>
    )}
  </header>
);

export default Header;
