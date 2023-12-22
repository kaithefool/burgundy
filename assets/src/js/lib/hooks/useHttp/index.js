import { useState, useRef, useEffect } from 'react';

import http from './http';
import compoundHttp from './compoundHttp';
import useComparable from '../useComparable';

/**
 * @typedef {import('./http').HttpRequest} HttpRequest
 * @typedef {import('./http').HttpResponse} HttpResponse
 */

/**
 * @callback httpStateRequest
 * @param {Array<HttpRequest>|HttpRequest} r - A single or multiple
 * request configs.
 *
 * @returns {Promise<HttpResponse>}
 */

/**
 * @typedef {Object} HttpState
 * @property {HttpResponse} res - The http state.
 * @property {httpStateRequest} req - Makes a new HTTP request manually.
 * Previous unfinished requests will be aborted.
 * @property {HttpResponse} fetched - The last successful
 * response.
 * @property {Function} cancel - Cancels the current request.
 */

/**
 * A React hook for making HTTP requests and tracking their state.
 *
 * @param {Array<HttpRequest>|HttpRequest} [requests] - A single or multiple
 * request configs. Configs are monitored for changes and will trigger a new
 * request.
 *
 * @returns {HttpState}
 */
function useHttp(requests) {
  const xhr = useRef(undefined);
  const fetched = useRef(undefined);
  const [res, setRes] = useState({
    status: null,
    payload: null,
    code: null, // http status code
    progress: 0,
  });
  const resRef = useRef(() => res);

  const cancel = () => {
    if (xhr.current) {
      xhr.current.cancel();
    }
  };

  const response = (chg) => {
    const draft = { ...resRef.current, ...chg };

    resRef.current = draft; // ref for callbacks
    setRes(draft); // state for components
  };

  const req = (r, o) => {
    // detach all callback from previous request
    cancel();

    // pending
    response({
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

      response(state);
    }, o);

    xhr.current = x;

    return x;
  };

  useEffect(() => {
    // shortcut to call req in init
    if (requests) req(requests);

    // disable callbacks to prevent memory leak
    return () => {
      cancel();
    };
  }, [useComparable(requests)]);

  return {
    res: resRef.current,
    req,
    fetched: fetched.current,
    cancel,
  };
}

export default useHttp;
