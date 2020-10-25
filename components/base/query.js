const mysql = require('mysql2');
const { castArray } = require('lodash');

module.exports = {
  select(fields) {
    if (!fields) return '*';

    return mysql.escapeId(fields);
  },

  where(criteria, clause = true) {
    if (!criteria) return '';

    const c = castArray(criteria);


  },

  sort(order, clause = true) {
    if (!order) return '';

    const o = castArray(order);
    const q = Object.keys(o).map((key) => {
      const dir = parseInt(o[key], 10) === 1
        ? 'DESC' : 'ASC';

      return `${mysql.escapeId(key)} ${dir}`;
    }).join(', ');

    return clause ? `ORDER BY ${q}` : q;
  },

  paginate({ limit = 10, skip = 0 }) {
    if (skip === undefined || limit === undefined) return '';

    return `LIMIT ${parseInt(limit, 10)} OFFSET ${parseInt(skip, 10)}`;
  },
};
