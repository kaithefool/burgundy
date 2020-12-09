const fs = require('fs-extra');
const path = require('path');
const { groupBy } = require('lodash');

const Service = require('../../base/Service');
const model = require('../models/i18n');
const env = require('../../../start/env');

class I18nServ extends Service {
  constructor(...args) {
    super(...args);

    this.allToJSONFile();
  }

  async toJSONFile(locale, rows) {
    const rr = rows || await this.find({ locale });

    const obj = this.model.toObj(rr);
    const filename = `${locale}.json`;

    await fs.outputJSON(
      path.resolve(
        __dirname,
        '../../../',
        env.fileStorage.locales,
        filename,
      ),
      obj,
    );
  }

  async allToJSONFile() {
    const locales = groupBy(await this.find(), 'locale');

    await Promise.all(
      Object
        .keys(locales)
        .map((l) => this.toJSONFile(l, locales[l])),
    );
  }

  async upsert(attrs, user) {
    const { locale } = attrs;
    const v = await super.upsert(attrs, user);

    await this.toJSONFile(locale);

    return v;
  }
}

module.exports = new I18nServ(model);
