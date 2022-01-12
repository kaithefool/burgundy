import React from 'react';
import { useTranslation } from 'react-i18next';
import capitalize from 'lodash/capitalize';
import { Link } from 'react-router-dom';

import useActiveLink from './useActiveLink';
import { resolvePath } from '~/commons/helpers';

const Breadcrumbs = (props) => {
  const { className, residue: includeResidue = false } = props;
  let { paths = [] } = props;

  const { t } = useTranslation();
  const {
    parent, active, exact, residue,
  } = useActiveLink();

  if (!paths.length && !exact) {
    // active
    paths = [
      { to: active.to, label: active.label },
    ];

    // parent
    if (parent.to !== active.to) {
      paths.unshift({ to: parent.to, label: parent.label });
    }

    // residue
    if (includeResidue) {
      paths.push(
        ...residue
          .slice(0, -1)
          .map((p, i) => ({
            to: Array.from(
              { length: residue.length - 1 - i },
              () => '..',
            ).join('/'),
            label: capitalize(p),
          })),
      );
    }
  }

  if (paths.length <= 0) return '';

  return (
    <div className={className}>
      {paths.map(({ label, to, ...b }, i) => (
        <span key={i}>
          <Link {...b} to={resolvePath(to)}>
            {t(`nav.${label}`, label)}
          </Link>
          &nbsp;/&nbsp;
        </span>
      ))}
    </div>
  );
};

export default Breadcrumbs;
