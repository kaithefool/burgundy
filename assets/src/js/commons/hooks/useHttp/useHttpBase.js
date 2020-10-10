import { useState, useRef, useEffect } from 'react';

import http from './http';
import compoundHttp from './compoundHttp';

function useHttpBase(requests, opts) {
  const id = useRef(0);
  const fetched = useRef(undefined);
  const [res, setRes] = useState({
    status: null,
    payload: null,
    code: null,
    progress: 0,
  });

  const req = (r, o) => {
    const rId = id.current + 1;

    id.current = rId;

    // pending
    setRes({
      status: 'pending',
      payload: null,
      code: null,
      progress: 0,
    });

    return (
      Array.isArray(r) ? compoundHttp : http
    )(r, (state) => {
      // only update state if this is the last request made
      if (rId === id.current) {
        if (state.status === 'success') {
          fetched.current = state;
        }
        setRes({ ...res, ...state });
      }
    }, o);
  };

  useEffect(() => {
    // shortcut to call req in init
    if (requests) {
      req(requests, opts);
    }
  }, []);

  return { res, req, fetched };
}

export default useHttpBase;
