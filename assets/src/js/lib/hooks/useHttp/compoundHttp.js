import http from './http';

/**
 * Makes multiple HTTP requests concurrently
 * and provides a unified progress update.
 *
 * @param {Array<import("./http").HttpRequest>} requests
 * @description An array of request configurations for each HTTP request.
 * @param {import("./http").httpCallback} cb - The callback function to be executed after each request. Receives an object with the progress or the result.
 * @param {import("./http").HttpProgressOptions} opts - The options for tracking upload/download progress.
 *
 * @returns {Promise<HttpResponse>} - A promise that resolves to the responses of the HTTP requests.
 */
function compoundHttp(requests, cb, opts) {
  const states = [];
  const xhrs = [];

  const cancel = () => xhrs.forEach((x) => x.cancel());

  requests.forEach((r, i) => {
    states.push({});

    const x = http(r, (state) => {
      states[i] = state;

      // sum the total progress
      if (!state.status && state.progress) {
        cb({
          progress: (
            states.map((s) => s.progress || 0).reduce((a, p) => a + p, 0)
          ) / states.length,
        });
      }
      // error
      if (state.status === 'error') {
        cb(state);
        cancel();
      }
      // when all requests succeed
      if (states.every((s) => s.status === 'success')) {
        cb(Object.assign(
          {},
          ...states,
          { payload: states.map((s) => s.payload) },
        ));
      }
    }, opts);

    xhrs.push(x);
  });

  const promise = Promise.all(xhrs);

  // expose cancel fn
  promise.cancel = cancel;

  return promise;
}

export default compoundHttp;
