const m = require('mongoose');
const _ = require('lodash');
const ms = require('ms');

const { LANG } = process.env;
const { ObjectId } = m.Schema.Types;

module.exports = class Schema {
  static lang(field) {
    return LANG.map((ln) => (
      typeof field === 'function'
        ? field(ln)
        : field
    ));
  }

  static ref(ref) {
    const type = ObjectId;

    return ref ? { type, ref } : { type };
  }

  static fromNow(duration) {
    return () => {
      const d = new Date();

      d.setTime(d.getTime() + ms(duration));

      return d;
    };
  }

  static onConnected(fn) {
    m.connection.on('connected', fn);
  }

  constructor(name, paths, {
    timestamps,
    uniques,
    indexes,
    hasMany,
    toJSON = { virtuals: true },
    toObject = { virtuals: true },
    ...opts
  } = {}) {
    const schema = new m.Schema(paths, {
      toJSON,
      toObject,
      ...opts,
    });
    const { methods, statics } = schema;

    Object.assign(this, {
      schema,
      name,
      paths,
      opts,
      methods,
      statics,
    });

    if (timestamps) this.timestamps(timestamps);
    if (uniques) _.castArray(uniques).forEach((u) => this.unique(u));
    if (indexes) _.castArray(indexes).forEach((i) => this.index(i));
    if (hasMany) _.castArray(hasMany).forEach((h) => this.hasMany(h));
  }

  get model() {
    const { name, schema, mm } = this;
    this.mm = mm || m.model(name, schema);

    this.mm.syncIndexes();

    return this.mm;
  }

  unique(paths = {}, sparse = false) {
    this.index({
      ...paths,
      ...(this.schema.path('deletedBy') && { deletedAt: 1 }),
    }, { unique: true, sparse });
  }

  index(...args) {
    this.schema.index(...args);
  }

  hasMany(ref) {
    const pluralized = m.pluralize()(ref);

    this.schema.virtual(pluralized, {
      ref,
      localField: '_id',
      foreignField: ref === this.name
        ? 'parent'
        : _.camelCase(this.name),
    });
  }

  softDelete() {
    this.schema.statics.softDelete = function softDelete(filter, by) {
      const { schema } = this;
      const mark = { deletedAt: new Date() };

      if (schema.path('deletedBy')) {
        mark.deletedBy = by;
      }

      return this.updateMany(filter, mark);
    };
    this.schema.methods.softDelete = function softDelete(by) {
      this.constructor.softDelete({ _id: this._id }, by);
    };
  }

  timestamps({
    created = true,
    updated = true,
    deleted = true, // soft delete
  } = {}) {
    const { schema: s } = this;

    s.set('timestamps', {
      createdBy: Boolean(created),
      updatedAt: Boolean(updated),
    });

    if (deleted) {
      s.path('deletedAt', {
        type: Date,
        default: null,
        select: false,
      });
      this.softDelete();
    }

    // by user
    ['created', 'updated', 'deleted'].forEach((d) => {
      if (!(typeof d === 'object' && !d.by)) {
        s.path(
          `${d}By`,
          this.constructor.ref('User'),
        );
      }
    });
  }

  getter(prop, fn) {
    this.schema.virtual(prop).get(fn);
  }
};
