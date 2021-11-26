import React from 'react';
import { Link } from 'react-router-dom';

import SubDirsNav from './SubDirsNav';
import BtnLng from '~/commons/components/btns/BtnLng';

const Header = ({
  title = '',
  breadcrumb = [],
  subsDir = true,
}) => (
  <header>
    <nav className="border-bottom p-4 pb-2">
      <div className="row">
        <div className="col">
          <h5>
            {breadcrumb.map((b, i) => (
              <span key={i}>
                <Link {...b} />
                  &nbsp;/&nbsp;
              </span>
            ))}
            {title}
          </h5>
        </div>
        <BtnLng className="col-auto" />
      </div>

    </nav>
    {subsDir && (
      <div className="p-4 py-3">
        <SubDirsNav {...subsDir} />
      </div>
    )}
  </header>
);

export default Header;
