const fs = require('fs-extra');
const path = require('path');
const _ = require('lodash');

const Service = require('../../base/Service');
const model = require('../models/i18ns');
const env = require('../../../start/env');

class I18nServ extends Service {
  async toJSONFile(lang, ns, rows) {
    const rr = rows || await this.find({ lang, ns });

    const obj = this.model.toObj(rr);

    await fs.outputJSON(
      path.resolve(
        __dirname,
        '../../../',
        env.fileStorage.locales,
        lang,
        `${ns}.json`,
      ),
      obj,
    );
  }

  async exportAll() {
    const p = [];
    const locales = _.groupBy(await this.find(), 'lang');

    _.forEach(locales, (tt, lang) => (
      _.forEach(_.groupBy(tt, 'ns'), (t, ns) => (
        p.push(this.toJSONFile(lang, ns, t))
      ))
    ));

    await Promise.all(p);
  }

  async upsert(attrs, user) {
    const { lang, ns } = attrs;
    const v = await super.upsert(attrs, user);

    await this.toJSONFile(lang, ns);

    return v;
  }
}

module.exports = new I18nServ(model);
