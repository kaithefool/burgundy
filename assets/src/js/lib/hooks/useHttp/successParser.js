export default function successParser(response) {
  return {
    status: 'success',
    payload: response.data,
    code: response.status,
    progress: 1,
  };
}
