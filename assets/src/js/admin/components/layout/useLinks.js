import { matchPath, useLocation } from 'react-router-dom';

import linkGroups from './links';

export default function useLinks(exact = false) {
  const loc = useLocation();
  let parent;
  let active;

  linkGroups.find((g) => {
    parent = g.find(({ links = [], ...p }) => {
      active = [...links, p].find((l) => (
        l.to && matchPath(`${l.to}${exact ? '' : '/*'}`, loc.pathname)
      ));

      return active;
    });

    return parent;
  });

  return {
    parent,
    active,
  };
}
