const { nanoid } = require('nanoid');
const dbConn = require('../../start/db');

const { escape, escapeId } = dbConn;

class Model {
  constructor(tbl, opts = {}) {
    this.db = dbConn;
    this.tbl = tbl;
    this.opts = opts;
  }

  async set(values, withDefaults = false) {
    const s = async (v) => (
      withDefaults
        ? { ...this.defaults(), ...await this.setter(v) }
        : this.setter(v)
    );

    const toSet = Array.isArray()
      ? Promise.all(values.map((v) => s(v)))
      : s(values);

    return toSet;
  }

  defaults() {
    const { id = 'id' } = this.opts;

    return id ? { [id]: nanoid(21) } : {};
  }

  setter(values) {
    return values;
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

  async count(filter) {
    const { db, tbl } = this;

    const [[{ count }]] = await db.query(`
      SELECT COUNT(*) AS count FROM ${tbl}
      ${this.where(filter)}
    `);

    return count;
  }

  async find({
    filter,
    skip,
    limit,
    sort,
    select,
  } = {}) {
    const { tbl, db } = this;

    const [r] = await db.query(`
      SELECT ${this.select(select)}
      FROM ${tbl}
      ${this.where(filter)}
      ${this.sort(sort)}
      ${this.paginate({ skip, limit })};
    `);

    return r;
  }

  async insert(values) {
    const { tbl, db } = this;
    const v = await this.set(values, true);

    console.log(v, escape(v));

    await db.query(`
      INSERT INTO ${tbl}
      SET ${escape(v)}
    `);

    return v;
  }

  async update(values = {}, filter) {
    const { tbl, db } = this;

    const r = await db.query(`
      UPDATE ${tbl}
      SET ${escape(await this.set(values))}
      ${this.where(filter)}
    `);

    return r;
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
