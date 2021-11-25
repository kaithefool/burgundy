import { useNavigate } from 'react-router-dom';

function resolvePath(...segments) {
  const { origin, pathname } = window.location;
  let url = new URL(`${origin}${pathname.replace(/\/$/, '')}/`);

  segments.forEach((s) => {
    url = new URL(s, url);
  });

  return url.pathname.replace(/\/$/, '');
}

export default function usePath() {
  const navigate = useNavigate();

  return {
    resolvePath,
    pushPath: (...seg) => navigate(resolvePath(...seg)),
    replacePath: (...seg) => navigate(
      resolvePath(...seg),
      { replace: true },
    ),
  };
}
