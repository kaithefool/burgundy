import React from 'react';
import { useTranslation } from 'react-i18next';

import SubDirsNav from './SubDirsNav';
import BtnLng from '~/commons/components/btns/BtnLng';
import { meta } from '~/commons/helpers';
import useActiveLink from './useActiveLink';
import Breadcrumbs from './Breadcrumbs';

const Header = ({
  title: titleOpt,
  breadcrumbs,
  subsDir = true,
}) => {
  const { t, i18n } = useTranslation();
  const { parent, active } = useActiveLink();

  let title = titleOpt
    || (parent || active)?.label
    || '';

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
            <Breadcrumbs
              className="small mb-2"
              {...(
                Array.isArray(breadcrumbs)
                  ? { paths: breadcrumbs }
                  : breadcrumbs
              )}
            />
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
