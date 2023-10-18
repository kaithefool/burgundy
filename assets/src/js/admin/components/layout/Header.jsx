import React from 'react';
import { useTranslation } from 'react-i18next';

import { meta } from '~/lib/helpers';

import SubDirsNav from './SubDirsNav';
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
        <Breadcrumbs
          className="small mb-2"
          {...(
            Array.isArray(breadcrumbs)
              ? { paths: breadcrumbs }
              : breadcrumbs
          )}
        />
        <h1 className="h5 mb-0">
          {title}
        </h1>
      </nav>
      {subsDir && (
        <SubDirsNav {...subsDir} />
      )}
    </header>
  );
};

export default Header;
