const dbConn = require('../../start/db');
const query = require('./query');

class Model {
  constructor(tbl) {
    this.db = dbConn;
    this.tbl = tbl;
    this.q = query;
  }

  count(filter) {
    const { db, tbl, q } = this;

    return db.query(`
      SELECT COUNT(*) FROM ${tbl}
      ${q.where(filter)}
    `);
  }

  find({
    filter,
    skip,
    limit,
    sort,
    select,
  }) {
    const { tbl, db, q } = this;

    return db.query(`
      SELECT ${q.select(select)}
      FROM ${tbl}
      ${q.where(filter)}
      ${q.sort(sort)}
      ${q.paginate({ skip, limit })}
    `);
  }

  create(values) {
    const { tbl, db } = this;

    return db.query(`
      INSERT INTO ${tbl}
      SET ?
    `, [values]);
  }

  update(values = {}, filter) {
    const { tbl, db, q } = this;

    return db.query(`
      UPDATE ${tbl}
      SET ?
      ${q.where(filter)}
    `, [values]);
  }

  delete(filter) {
    const { tbl, db, q } = this;

    return db.query(`
      DELETE FROM ${tbl}
      ${q.where(filter)}
    `);
  }
}

module.exports = Model;
