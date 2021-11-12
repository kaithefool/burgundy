export default function errorParser(err) {
  const { response, message, code } = err;
  let payload;

  if (message === 'Network Error') {
    payload = { message: 'Oops...can\'t connect to the server :(' };
  } else if (code === 'ECONNABORTED') {
    payload = { message: 'Connection timeout' };
  } else {
    payload = response.data;
  }

  return {
    status: 'error',
    payload,
    code: response ? response.status : null,
    progress: 0,
  };
}
