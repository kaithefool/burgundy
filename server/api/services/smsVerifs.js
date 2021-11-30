const Service = require('../base/Service');
const model = require('../models/smsVerifs');
const sms = require('../../lib/sms');

class SmsVerifServ extends Service {
  async create({ mobile }, user, { t }) {
    // delete all pervious codes
    await this.deleteBy({ mobile });

    const { verifyKey } = await super.create({ mobile });

    sms({
      to: mobile,
      body: t('sms.verify', { verifyKey }),
    });
  }

  async verify({ mobile, verifyKey }) {
    const found = await this.find({ mobile, verifyKey });

    // remove key
  }

  registerOrLogin() {

  }
}

module.exports = new SmsVerifServ(model);
