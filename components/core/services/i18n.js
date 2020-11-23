const fs = require('fs-extra');
const path = require('path');

const Service = require('../../base/Service');
const model = require('../models/i18n');
const env = require('../../../start/env');

class I18nServ extends Service {
  async toJSONFile(locale) {
    const rows = await this.find({ locale });
    const obj = this.model.toObj(rows);
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

  async upsert(attrs, user) {
    const { locale } = attrs;
    const v = await super.upsert(attrs, user);

    await this.toJSONFile(locale);

    return v;
  }
}

module.exports = new I18nServ(model);
