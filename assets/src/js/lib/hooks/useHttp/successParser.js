export default function successParser(r) {
  return {
    status: 'success',
    payload: r.data,
    code: r.status,
    progress: 1,
  };
}
