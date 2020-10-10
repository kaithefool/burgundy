import { useState, useRef } from 'react';
import axios from 'axios';
import qs from 'qs';

import successParser from './successParser';
import errorParser from './errorParser';

function useHttpBase() {
  const id = useRef(0);
  const fetched = useRef(undefined);
  const [res, setRes] = useState({
    status: null,
    payload: null,
    code: null,
    progress: 0,
  });

  const req = async (args) => {
    let state;
    const rId = id.current + 1;

    id.current = rId;

    // pending
    setRes({ status: 'pending', payload: null, progress: 0 });

    try {
      const r = await axios({
        onUploadProgress(e) {
          setRes({ ...res, progress: e.loaded / e.total });
        },
        paramsSerializer: (params) => (
          qs.stringify(params)
        ),
        timeout: 2 * 60 * 1000,
        ...args,
      });

      // success
      state = successParser(r);

      return state;
    } catch (e) {
      state = errorParser(e);
    }

    // only update state if this is the last request made
    if (rId === id.current) {
      fetched.current = state;
      setRes(state);
    }

    return state;
  };

  return [res, req, fetched];
}

export default useHttpBase;
