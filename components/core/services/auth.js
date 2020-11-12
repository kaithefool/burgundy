const jwt = require('jsonwebtoken');
const { pick } = require('lodash');

const Service = require('../../base/Service');
const usersModel = require('../models/users');

const {
  secret, jwt: { accessTtl, refreshTtl },
} = require('../../../start/env');

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
    const [u] = await this.find({ email });

    if (!u) {
      this.throw(400, 'auth.invalidCredentials');
    }
    if (!u.active) {
      this.throw(400, 'auth.userInactivated');
    }
    if (!await this.model.comparePwd(password, u.password)) {
      this.throw(400, 'auth.invalidCredentials');
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
      this.throw(400, 'auth.invalidToken');
    }

    const [u] = await this.find({
      id: payload.id,
      active: 1,
    });

    if (!u) {
      this.throw(400, 'auth.invalidToken');
    }

    // check if user has logged out
    // after the token was issued
    if (u.last_logout > payload.iat) {
      this.throw(400, 'auth.loggedOut');
    }

    return {
      user: u,
      ...this.signTokens(u),
    };
  }

  async logout(attrs, user) {
    if (user) {
      await this.patch(
        { _id: user.id },
        { last_logout: new Date() },
      );
    }
  }
}

module.exports = new AuthServ(usersModel);
