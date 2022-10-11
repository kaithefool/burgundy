import { matchPath, useLocation, useParams } from 'react-router-dom';

import mainLinks from './links';

const linkGroups = mainLinks;

export default function useActiveLink() {
  const { pathname } = useLocation();
  const params = useParams();
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
    .split('/')
    .map((s) => {
      const match = Object.entries(params)
        .find(([, value]) => value === s);

      return match
        ? {
          key: match[0],
          value: match[1],
          toString() { return this.value; },
        }
        : s;
    });

  return {
    parent,
    active,
    exact,
    residue,
  };
}
