import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import SubDirsNav from './SubDirsNav';
import BtnLng from '~/commons/components/btns/BtnLng';
import { resolvePath, meta } from '~/commons/helpers';
import useLinks from './useLinks';

const Header = ({
  title: titleOpt,
  breadcrumb: breadcrumbOpt,
  subsDir = true,
}) => {
  const { t, i18n } = useTranslation();
  const { parent, active } = useLinks();
  const exact = (useLinks(true).active);

  let title = titleOpt
    || (parent || active)?.label
    || '';
  const breadcrumb = breadcrumbOpt
    || (
      !exact && [
        ...(parent.to !== active.to ? [
          { to: parent.to, children: parent.label },
        ] : []),
        { to: active.to, children: active.label },
      ]
    )
    || [];

  if (typeof title === 'object') {
    title = i18n.pickLng(title);
  } else {
    title = t(`nav.${title}`, title);
  }

  meta({ title });

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
            <h1 className="h5">
              {title}
            </h1>
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
