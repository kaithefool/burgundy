import { useState, useRef, useEffect } from 'react';

import http from './http';
import compoundHttp from './compoundHttp';

function useHttpBase(requests, opts) {
  const xhr = useRef(undefined);
  const fetched = useRef(undefined);
  const [res, setRes] = useState({
    status: null,
    payload: null,
    code: null,
    progress: 0,
  });

  const req = (r, o) => {
    if (xhr.current) {
      // detach all callback from perivous request
      xhr.current.destroy();
    }

    // pending
    setRes({
      status: 'pending',
      payload: null,
      code: null,
      progress: 0,
    });

    const x = (
      Array.isArray(r) ? compoundHttp : http
    )(r, (state) => {
      if (state.status === 'success') {
        fetched.current = state;
      }
      setRes({ ...res, ...state });
    }, o);

    xhr.current = x;
  };

  useEffect(() => {
    // shortcut to call req in init
    if (requests) {
      req(requests, opts);
    }

    // disable callbacks to prevent memory leak
    return () => {
      if (xhr.current) {
        xhr.current.destroy();
      }
    };
  }, []);

  return { res, req, fetched };
}

export default useHttpBase;
