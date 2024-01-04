export default function pendingParser(progress = 0) {
  return {
    status: 'pending',
    payload: null,
    code: null,
    progress,
  };
}
