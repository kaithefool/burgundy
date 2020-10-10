import http from './http';

function compoundHttp(requests, cb, opts) {
  const states = [];
  let ended = false;

  requests.forEach((r, i) => {
    states.push({});
    http(r, (state) => {
      if (ended) return;

      states[i] = state;

      // sum the total progress
      if (!state.status && state.progress) {
        cb({
          progress: Math.sum(
            ...states.map((s) => s.progress || 0) / states.length,
          ),
        });
      }
      // error
      if (state.status === 'error') {
        cb(state);
        ended = true;
      }
      // when all requests succeed
      if (states.every((s) => s.status === 'success')) {
        cb(Object.assign(
          {},
          ...states,
          { payload: states.map((s) => s.payload) },
        ));
        ended = true;
      }
    }, opts);
  });
}

export default compoundHttp;
