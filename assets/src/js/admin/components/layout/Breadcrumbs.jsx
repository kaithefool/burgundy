import React from 'react';
import { useTranslation } from 'react-i18next';
import capitalize from 'lodash/capitalize';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons/faAngleRight';

import { resolvePath } from '~/commons/helpers';

import useActiveLink from './useActiveLink';

const Breadcrumbs = ({
  className,
  residue: includeResidue = true,
  params = {},
  ...props
}) => {
  let { paths = [] } = props;

  const { t, i18n } = useTranslation();
  const {
    parent, active, exact, residue,
  } = useActiveLink();

  if (!paths.length && !exact && active) {
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
          .slice(
            0,
            residue.slice(-1)[0].key === 'tab' ? -2 : -1,
          )
          .map((p, i) => ({
            to: Array.from(
              { length: residue.length - 1 - i },
              () => '..',
            ).join('/'),
            label: params[p.key] || capitalize(p),
          })),
      );
    }
  }

  if (paths.length <= 0) return '';

  return (
    <div className={className}>
      {paths.map(({ label, to, ...b }, i) => (
        <span key={i}>
          <Link
            {...b}
            to={resolvePath(to)}
            className="link-neutral text-decoration-none"
          >
            {typeof label === 'object'
              ? i18n.pickLng(label)
              : t(`nav.${label}`, label)}
          </Link>
          <span className="mx-3 text-muted">
            <FA icon={faAngleRight} />
          </span>
        </span>
      ))}
    </div>
  );
};

export default Breadcrumbs;
