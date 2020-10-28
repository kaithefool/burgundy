const dbConn = require('../../start/db');

const { escape, escapeId } = dbConn;

class Model {
  constructor(tbl) {
    this.db = dbConn;
    this.tbl = tbl;
  }

  select(fields) {
    if (!fields) return '*';

    return escapeId(fields);
  }

  where(filter, clause = true) {
    if (!filter) return '';

    const q = Object.keys(filter).map((key) => (
      escape({ [key]: filter[key] })
    )).join(', ');

    return clause ? `ORDER BY ${q}` : q;
  }

  sort(order, clause = true) {
    if (!order) return '';

    const q = Object.keys(order).map((key) => {
      const dir = parseInt(order[key], 10) === 1
        ? 'DESC' : 'ASC';

      return `${escapeId(key)} ${dir}`;
    }).join(', ');

    return clause ? `ORDER BY ${q}` : q;
  }

  paginate({ limit = 10, skip = 0 }) {
    if (skip === undefined || limit === undefined) return '';

    return `LIMIT ${parseInt(limit, 10)} OFFSET ${parseInt(skip, 10)}`;
  }

  count(filter) {
    const { db, tbl } = this;

    return db.query(`
      SELECT COUNT(*) FROM ${tbl}
      ${this.where(filter)}
    `);
  }

  find({
    filter,
    skip,
    limit,
    sort,
    select,
  } = {}) {
    const { tbl, db } = this;

    return db.query(`
      SELECT ${this.select(select)}
      FROM ${tbl}
      ${this.where(filter)}
      ${this.sort(sort)}
      ${this.paginate({ skip, limit })}
    `);
  }

  insert(values) {
    const { tbl, db } = this;

    return db.query(`
      INSERT INTO ${tbl}
      SET ${escape(values)}
    `);
  }

  update(values = {}, filter) {
    const { tbl, db } = this;

    return db.query(`
      UPDATE ${tbl}
      SET ${escape(values)}
      ${this.where(filter)}
    `);
  }

  delete(filter) {
    const { tbl, db } = this;

    return db.query(`
      DELETE FROM ${tbl}
      ${this.where(filter)}
    `);
  }
}

module.exports = Model;
