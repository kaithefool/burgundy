const fs = require('fs-extra');
const path = require('path');
const { groupBy, forEach } = require('lodash');

const Service = require('../../base/Service');
const model = require('../models/i18n');
const env = require('../../../start/env');

class I18nServ extends Service {
  constructor(...args) {
    super(...args);

    this.exportAll();
  }

  async toJSONFile(lng, ns, rows) {
    const rr = rows || await this.find({ lng, ns });

    const obj = this.model.toObj(rr);

    await fs.outputJSON(
      path.resolve(
        __dirname,
        '../../../',
        env.fileStorage.locales,
        lng,
        `${ns}.json`,
      ),
      obj,
    );
  }

  async exportAll() {
    const p = [];
    const locales = groupBy(await this.find(), 'lng');

    forEach(locales, (tt, lng) => (
      forEach(groupBy(tt, 'ns'), (t, ns) => (
        p.push(this.toJSONFile(lng, ns, t))
      ))
    ));

    await Promise.all(p);
  }

  async upsert(attrs, user) {
    const { lng, ns } = attrs;
    const v = await super.upsert(attrs, user);

    await this.toJSONFile(lng, ns);

    return v;
  }
}

module.exports = new I18nServ(model);
