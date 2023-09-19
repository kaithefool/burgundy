export default function successParser(
  r,
  parserFn = (payload) => payload,
) {
  return {
    status: 'success',
    payload: parserFn(r.data, r),
    code: r.status,
    progress: 1,
  };
}
