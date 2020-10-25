const mysql = require('mysql2');
const { castArray } = require('lodash');

module.exports = {
  select() {},

  where(criteria, clause = true) {
    if (!criteria) return '';

    let q = clause ? 'WHERE ' : '';
  },

  sort(order, clause = true) {
    if (!order) return '';

    const o = castArray(order);
    let q = clause ? 'ORDER BY ' : '';

    q += Object.keys(o).map((key) => {
      const dir = parseInt(o[key], 10) === 1
        ? 'DESC' : 'ASC';

      return `${mysql.escapeId(key)} ${dir}`;
    }).join(', ');

    return q;
  },

  paginate({ skip = 0, limit = 10 }) {
    return `LIMIT 10 OFFSET 10`;
  },
};
