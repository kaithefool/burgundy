import http from './http';

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
