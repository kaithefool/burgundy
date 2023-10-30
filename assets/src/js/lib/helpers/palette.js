const colors = [];

let idx = 0;
const memo = JSON.parse(localStorage.getItem('palette')) || {};

export class Color {
  constructor(color) {
    const c = typeof color === 'string'
      ? { main: color }
      : color;

    Object.assign(this, c);
  }

  toString() {
    return this.main;
  }
}

export const addColors = (cc = []) => {
  colors.push(...cc.map((c) => new Color(c)));

  idx = Math.round(Math.random() * colors.length - 1);
};

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
