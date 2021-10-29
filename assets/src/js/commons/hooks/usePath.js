import { useHistory } from 'react-router-dom';

function resolvePath(...segments) {
  const { origin, pathname } = window.location;
  let url = new URL(`${origin}${pathname.replace(/\/$/, '')}/`);

  segments.forEach((s) => {
    url = new URL(s, url);
  });

  return url.pathname.replace(/\/$/, '');
}

export default function usePath() {
  const history = useHistory();

  return {
    resolvePath,
    pushPath: (...seg) => history.push(resolvePath(...seg)),
    replacePath: (...seg) => history.replace(resolvePath(...seg)),
  };
}
