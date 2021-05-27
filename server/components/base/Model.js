const { nanoid } = require('nanoid');
const { escape, escapeId } = require('mysql2');
const { castArray } = require('lodash');

const dbConn = require('../../start/db');

class Model {
  constructor(tbl, opts = {}) {
    this.db = dbConn;
    this.tbl = tbl;
    this.opts = {
      softDelete: true,
      id: 'id',
      ...opts,
    };
  }

  async set(values, withDefaults = false) {
    const s = async (v) => (
      withDefaults
        ? { ...this.defaults(), ...await this.setter(v) }
        : this.setter(v)
    );

    const toSet = Array.isArray(values)
      ? await Promise.all(values.map((v) => s(v)))
      : s(values);

    return toSet;
  }

  defaults() {
    const { id } = this.opts;

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
    const f = this.opts.softDelete
      ? { ...filter, not_deleted: 1 }
      : filter;

    if (!f) return '';

    const q = Object.keys(f).map((key) => (
      escape({ [key]: f[key] })
    )).join(' AND ');

    return clause ? `WHERE ${q}` : q;
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

  paginate(skip, limit) {
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
      ${this.paginate(skip, limit)};
    `);

    return r;
  }

  async insert(values) {
    const { tbl, db } = this;

    const v = await this.set(castArray(values), true);
    const cols = Object.keys(v[0]);
    const rows = v.map((r) => Object.values(r));

    await db.query(`
      INSERT INTO ${tbl} (${escapeId(cols)})
      VALUES ${escape(rows)}
    `);

    return v;
  }

  async upsert(values = {}) {
    const { tbl, db } = this;

    const v = await this.set(values);

    await db.query(`
      INSERT INTO ${tbl}
      SET ${escape(v)}
      ON DUPLICATE KEY UPDATE
        ${escape(v)}
    `);

    return v;
  }

  async update(values = {}, filter) {
    const { tbl, db } = this;

    await db.query(`
      UPDATE ${tbl}
      SET ${escape(await this.set(values))}
      ${this.where(filter)}
    `);
  }

  softDelete(filter) {
    return this.update({
      not_deleted: null,
    }, filter);
  }

  hardDelete(filter) {
    const { tbl, db } = this;

    return db.query(`
      DELETE FROM ${tbl}
      ${this.where(filter)}
    `);
  }

  delete(...args) {
    const { softDelete } = this.opts;

    return softDelete
      ? this.softDelete(...args)
      : this.hardDelete(...args);
  }
}

module.exports = Model;
