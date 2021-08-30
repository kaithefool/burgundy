const fs = require('fs-extra');
const path = require('path');
const _ = require('lodash');

const Service = require('../base/Service');
const model = require('../models/i18ns');

const { FILE_STORAGE_LOCALES } = process.env;

class I18nServ extends Service {
  constructor(...args) {
    super(...args);
    this.exportAll();
  }

  async export(lang, ns, rows) {
    const rr = rows || await this.find({
      filter: { lang, ns },
    });
    const o = {};

    rr.forEach((r) => {
      _.set(o, r.path, r.translation);
    });

    await fs.outputJSON(
      path.resolve(
        __dirname,
        '../../../',
        FILE_STORAGE_LOCALES,
        lang,
        `${ns}.json`,
      ),
      o,
    );
  }

  async exportAll() {
    const p = [];
    const locales = _.groupBy(await this.find(), 'lang');

    _.forEach(locales, (tt, lang) => (
      _.forEach(_.groupBy(tt, 'ns'), (t, ns) => (
        p.push(this.export(lang, ns, t))
      ))
    ));

    await Promise.all(p);
  }

  async create(attrs, user) {
    const { lang, ns } = attrs;
    const v = await super.patchBy(
      { lang, ns },
      attrs,
      user,
      { upsert: true },
    );

    await this.export(lang, ns);

    return v;
  }
}

module.exports = new I18nServ(model);
