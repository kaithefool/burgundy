const Otps = require('./Otps');
const userServ = require('../users');
const authServ = require('../auth');

class AuthMobileServ extends Otps {
  create(attrs, user, { t }) {
    const { mobile } = attrs;

    return super.create({
      action: 'auth-mobile',
      mobile,
    }, (c) => ({
      body: t('sms.verify', c),
    }), attrs);
  }

  verify({ mobile, verifyKey }) {
    return super.verify({
      action: 'auth-mobile',
      mobile,
      verifyKey,
    });
  }

  async affirm({ verifyKey, mobile, ...attrs }) {
    const otp = await this.consume({
      action: 'auth-mobile',
      mobile,
      verifyKey,
    });

    let [u] = await userServ.find({ mobile });

    if (!u) {
      u = await userServ.create({
        ...otp,
        ...attrs,
        mobile,
      });
    }

    return authServ.login(u);
  }
}

module.exports = new AuthMobileServ();
