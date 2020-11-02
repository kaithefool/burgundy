const jwt = require('jsonwebtoken');
const { pick } = require('lodash');

const Service = require('../../base/Service');
const usersModel = require('../models/users');

const {
  env: { secret, jwt: { accessTtl, refreshTtl } },
} = process;

// props to store within the token
const userProps = [
  'id',
  'role',
];

class AuthServ extends Service {
  async authenticate(cred) {
    const u = await this.basicStrag(cred);

    return this.signTokens(u);
  }

  async basicStrag({ email, password }) {
    const [u] = await usersModel.find({
      filter: { email },
      select: [...userProps, 'password'],
    });

    if (!u) {
      this.throw(400, 'invalid email or password');
    }
    if (!u.active) {
      this.throw(400, 'user inactivated');
    }
    if (!await usersModel.comparePwd(password, u.password)) {
      this.throw(400, 'invalid email or password');
    }

    return u;
  }

  signTokens(user) {
    const props = pick(user, userProps);

    return {
      access: jwt.sign(
        props,
        secret,
        { expiresIn: accessTtl },
      ),
      refresh: jwt.sign(
        { id: user.id },
        secret,
        { expiresIn: refreshTtl },
      ),
    };
  }

  verifyToken(token) {
    return jwt.verify(token, secret);
  }

  async renewTokens(refreshTk) {
    let payload;

    try {
      payload = this.verifyToken(refreshTk);
    } catch (e) {
      this.throw(400, 'invalid token');
    }

    const [u] = await usersModel.find({
      filter: { id: payload.id, active: 1 },
      select: userProps,
    });

    if (!u) {
      this.throw(400, 'invalid token');
    }

    // check if user has logged out
    // after the token was issued
    if (u.last_logout > payload.iat) {
      this.throw(400, 'user logged out');
    }

    return {
      user: u,
      ...this.signTokens(u),
    };
  }

  async logout(attrs, user) {
    if (user) {
      await usersModel.update(
        { _id: user.id },
        { last_logout: new Date() },
      );
    }
  }
}

module.exports = new AuthServ(usersModel);
