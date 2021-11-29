const mail = require('../../lib/mail');
const Service = require('../base/Service');
const pwdResetsModel = require('../models/pwdResets');
const usersModel = require('../models/users');

const {
  RESET_PWD_MAX_TIMES,
} = process.env;

class PwdResetServ extends Service {
  async create({ email }) {
    const [u] = await usersModel.find({
      filter: { email, active: 1, deletedAt: null },
    });

    if (!u) this.throw(400, 'res.userNotExists');
    if (u.reset_locked) this.throw(400, 'res.maxPwdResetsReached');

    const resets = this.find({ filter: { user: u.id } });

    if (resets.length >= RESET_PWD_MAX_TIMES) {
      // prevent further reset emails
      await usersModel.update(
        { id: u.id },
        { resetLocked: true },
      );

      // notify the client
      this.throw(400, 'res.maxPwdResetsReached');
    }

    // deactivate previous reset keys
    await this.delete({ user: u.id });

    const { verifyKey } = await super.create({
      user: u.id,
    });

    // send email
    mail.send({
      template: 'pwdReset',
      message: { to: u.email },
      locals: {
        verifyKey,
        user: u,
      },
    });
  }

  async verify({ verifyKey }, returnDoc = false) {
    const [r] = await this.find({
      filter: { verifyKey, active: 1 },
    });

    if (!r) this.throw(400, 'res.invalidKey');
    if (returnDoc) return r;

    return null;
  }

  async reset({ verifyKey, password }) {
    const r = await this.verify({ verifyKey }, true);

    // make changes to user
    await usersModel.update(
      { id: r.user },
      { password },
    );

    // delete all keys
    await this.model.delete({ user: r.user });
  }
}

module.exports = new PwdResetServ(pwdResetsModel);
