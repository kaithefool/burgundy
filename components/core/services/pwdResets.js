const ms = require('ms');
const moment = require('moment');

const Service = require('../../base/Service');
const { pwdResetsModel, usersModel } = require('../models');

const {
  resetPwd: {
    maxTimes,
    keyTtl,
  },
} = process.env;

class PwdResetServ extends Service {
  async create({ email }) {
    const [u] = await usersModel.find({
      filter: { email, active: 1 },
    });

    if (!u) this.throw(400, 'pwdResets.userNotExists');
    if (u.reset_locked) this.throw(400, 'pwdResets.maxAttemptsReached');

    const resets = this.find({ user: u.id });

    if (resets.length >= maxTimes) {
      // prevent further reset emails
      await usersModel.update(
        { id: u.id },
        { reset_locked: 1 },
      );

      // notify the client
      this.throw(400, 'pwdResets.maxAttemptsReached');
    }

    // deactivate previous reset keys
    await this.patch({ user: u.id }, { active: 0 });

    const { insertId } = await super.create({
      user: u.id,
      expires_at: moment().add(ms(keyTtl), 'ms').toDate(),
    });

    console.log('created pwd_reset: ', insertId);
  }

  async verify({ id }) {
    const [r] = await this.find({ id, active: 1 });

    if (!r) this.throw(400, 'pwdResets.invalidKey');
  }

  async reset({ id, password }) {
    const [r] = await this.find({ id, active: 1 });

    if (!r) this.throw(400, 'pwdResets.invalidKey');

    await usersModel.update(
      { id: r.user },
      { password },
    );

    // delete all keys
    await this.model.delete({ user: r.user });
  }
}

module.exports = new PwdResetServ(pwdResetsModel);
