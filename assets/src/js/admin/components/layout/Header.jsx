import React from 'react';
import { Link } from 'react-router-dom';

import SubDirsNav from './SubDirsNav';
import usePath from '~/commons/hooks/usePath';

const Header = ({
  title = '',
  breadcrumb = [],
  subsDir = true,
}) => {
  const { path } = usePath();

  return (
    <header>
      <nav className="border-bottom p-4 pb-2">
        <h5>
          {breadcrumb.map(({ to, ...b }, i) => (
            <span key={i}>
              <Link to={path(to)} {...b} />
              &nbsp;/&nbsp;
            </span>
          ))}
          {title}
        </h5>
      </nav>
      {subsDir && (
        <div className="p-4 py-3">
          <SubDirsNav {...subsDir} />
        </div>
      )}
    </header>
  );
};

export default Header;
