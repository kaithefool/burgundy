const colors = [
  { main: '#EF4444' },
  { main: '#F97316' },
  { main: '#EAB308' },
  { main: '#84CC16' },
  { main: '#22C55E' },
  { main: '#06B6D4' },
  { main: '#3B82F6' },
  { main: '#8B5CF6' },
  { main: '#D946EF' },
];
colors.forEach((c) => {
  c.toString = function toString() { return this.main; };
});

let idx = Math.round(Math.random() * colors.length - 1);
const memo = JSON.parse(localStorage.getItem('palette')) || {};

export const findColor = (main) => (
  colors.find((color) => color.main === main)
);

export const getColorById = (_id) => {
  if (memo[_id] === undefined) {
    idx = (idx + 1) % colors.length;
    memo[_id] = colors[idx].main;
    localStorage.setItem('palette', JSON.stringify(memo));
  }

  return findColor(memo[_id]);
};

export const getColor = (entry) => {
  const color = findColor(entry?.color);

  return color || getColorById(entry._id);
};
