import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import SubDirsNav from './SubDirsNav';
import BtnLng from '~/commons/components/btns/BtnLng';
import { resolvePath } from '../../../commons/helpers';

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
            {breadcrumb?.length > 0 && (
              <div className="small mb-2">
                {breadcrumb.map(({ children, to, ...b }, i) => (
                  <span key={i}>
                    <Link {...b} to={resolvePath(to)}>
                      {t(`nav.${children}`, children)}
                    </Link>
                  &nbsp;/&nbsp;
                  </span>
                ))}
              </div>
            )}
            <h5>
              {t(`nav.${title}`, title)}
            </h5>
          </div>
          <BtnLng className="col-auto" />
        </div>
      </nav>
      {subsDir && (
        <SubDirsNav {...subsDir} />
      )}
    </header>
  );
};

export default Header;
