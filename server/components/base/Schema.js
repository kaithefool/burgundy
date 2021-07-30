const m = require('mongoose');
const _ = require('lodash');

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

  constructor(name, paths, opts) {
    const schema = new m.Schema(paths, opts);
    const { methods, statics } = schema;

    Object.assign(this, {
      schema,
      name,
      paths,
      opts,
      methods,
      statics,
    });
  }

  onConnected(fn) {
    m.connection.on('connected', fn);
  }

  get model() {
    if (this.modelInst) return this.modelInst;

    const { name, schema } = this;
    const model = m.model(name, schema);

    this.modelInst = model;

    return model;
  }

  enableVirtuals() {
    const { schema: s } = this;

    s.set('toJSON', { virtuals: true });
    s.set('toObject', { virtuals: true });
  }

  unique(paths = {}, sparse) {
    this.schema.index({
      ...paths,
      ...(this.schema.path('deletedBy')
        ? { deletedAt: 1 }
        : {}
      ),
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

    this.enableVirtuals();
  }

  softDelete() {
    this.schema.statics.softDelete = function softDelete(_ids, by) {
      const { schema } = this;
      const mark = { deletedAt: new Date() };

      if (schema.path('deletedBy')) {
        mark.deletedBy = by;
      }

      return this.updateMany({ _id: _ids }, mark);
    };
    this.schema.methods.softDelete = function softDelete(by) {
      this.constructor.softDelete(this._id, by);
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
      s.path('deletedAt', { type: Date, default: null });
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
    this.enableVirtuals();
  }
};
