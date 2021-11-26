import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import SubDirsNav from './SubDirsNav';
import BtnLng from '~/commons/components/btns/BtnLng';

const Header = ({
  title = '',
  breadcrumb = [],
  subsDir = true,
}) => {
  const { t } = useTranslation();

  return (
    <header>
      <nav className="border-bottom p-4 pb-2">
        <div className="row">
          <div className="col">
            <h5>
              {breadcrumb.map(({ children, ...b }, i) => (
                <span key={i}>
                  <Link {...b}>
                    {t(`nav.${children}`, children)}
                  </Link>
                  &nbsp;/&nbsp;
                </span>
              ))}
              {t(`nav.${title}`, title)}
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
};

export default Header;
