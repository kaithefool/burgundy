import http from './http';
import * as responses from './responses';

/**
 * Makes multiple HTTP requests concurrently
 * and provides a unified progress update.
 *
 * @param {Array<import('./http').HttpRequest>} requests
 * - An array of request configs for each HTTP request.
 * @param {import('./http').httpCallback} cb - A Callback to be called on
 * all status and progress changes.
 *
 * @returns {Promise<import('./http').HttpResponse>} - A promise that resolves
 * to the responses of the HTTP requests.
 */
function compoundHttp(requests, cb) {
  const reses = [];
  const https = [];
  const cancel = () => https.forEach((x) => x.cancel());

  requests.forEach((r, i) => {
    reses.push({});

    const x = http(r, (res) => {
      reses[i] = res;

      // sum the total progress
      if (res.status === 'pending') {
        const progress = (
          reses.map((re) => re.progress || 0).reduce((a, p) => a + p, 0)
        ) / reses.length;

        cb(responses.pending(progress));
      }
      // error
      if (res.status === 'error') {
        cb(res);
        cancel();
      }
      // when all requests succeed
      if (reses.every((s) => s.status === 'success')) {
        cb(Object.assign(
          {},
          ...reses,
          { payload: reses.map((s) => s.payload) },
        ));
      }
    });

    https.push(x);
  });

  const promise = Promise.all(https);

  // expose cancel fn
  promise.cancel = cancel;

  return promise;
}

export default compoundHttp;
