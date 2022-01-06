import { matchPath, useLocation } from 'react-router-dom';

import linkGroups from './links';

export default function useActiveLink() {
  const { pathname } = useLocation();
  let parent;
  let active;
  let exact;

  linkGroups.find((g) => {
    parent = g.find(({ links = [], ...p }) => {
      active = [...links, p].find((l) => (
        l.to && matchPath(`${l.to}/*`, pathname)
      ));

      if (active) exact = matchPath(active.to, pathname);

      return active;
    });

    return parent;
  });

  const residue = active && pathname
    .replace(new RegExp(`^${active.to}/`), '')
    .replace(/\/$/, '')
    .split('/');

  return {
    parent,
    active,
    exact,
    residue,
  };
}
