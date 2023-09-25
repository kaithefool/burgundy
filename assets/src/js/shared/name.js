export const isCJK = (s) => s.match(/[\u4e00-\u9faf\u3400-\u4dbf]/);

export const getInitial = (name) => {
  // reduce name to initial
  const segments = name.split(/[^a-z0-9\u4e00-\u9faf\u3400-\u4dbf]/i);

  let n = segments.length >= 2
    ? segments
      .slice(0, 2).map((s) => s[0])
      .join('').toUpperCase()
    : name.slice(0, 2);

  // CJK characters are wider
  if (isCJK(n[0])) {
    [n] = n;
  }

  return n;
};

export const getName = (i18n, {
  entry,
  type,
  initial = false,
}) => {
  let n = typeof entry === 'string' ? entry : '';

  if (type === 'user') {
    n = i18n.pickLng(entry.name) || entry.email;
  }

  if (initial) n = getInitial(n);

  return n;
};
