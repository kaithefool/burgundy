const Otps = require('./Otps');
const userServ = require('../users');

class PwdResetEmailServ extends Otps {
  async create(attrs) {
    const { email } = attrs;

    const [u] = await userServ.find({ email });

    if (u) this.throw(400, 'res.userAlreadyExists');

    return super.create({
      action: 'register-email',
      email,
    }, (c) => ({
      template: 'register',
      locals: { ...c.toObject(), user: u },
    }), attrs);
  }

  verify({ verifyKey }) {
    return super.verify({
      action: 'register-email',
      verifyKey,
    });
  }

  async affirm({ verifyKey }) {
    const otp = await this.consume({
      action: 'register-email',
      verifyKey,
    });

    const created = await userServ.create(otp);

    // set password (bypass password encryption)
    await userServ.model.model.updateOne(
      { _id: created._id },
      { password: otp.password },
    );
  }
}

module.exports = new PwdResetEmailServ();
