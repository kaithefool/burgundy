const jwt = require('jsonwebtoken');
const { pick } = require('lodash');

const Service = require('../../base/Service');
const usersModel = require('../models/users');

const {
  JWT_ACCESS_TTL,
  JWT_REFRESH_TTL,
  SECRET,
} = process.env;

// props to store within the token
const userProps = [
  '_id',
  'role',
];

class AuthServ extends Service {
  async authenticate(cred) {
    const u = await this.basicStrag(cred);

    // record login time
    await this.model.update(
      { _id: u._id },
      { lastLogin: new Date() },
    );

    return this.signTokens(u);
  }

  async basicStrag({ email, password }) {
    const [u] = await this.find({ filter: { email } });

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
        SECRET,
        { expiresIn: JWT_ACCESS_TTL },
      ),
      refresh: jwt.sign(
        { _id: user._id },
        SECRET,
        { expiresIn: JWT_REFRESH_TTL },
      ),
    };
  }

  verifyToken(token) {
    return jwt.verify(token, SECRET);
  }

  async renewTokens(refreshTk) {
    let payload;

    try {
      payload = this.verifyToken(refreshTk);
    } catch (e) {
      this.throw(400, 'auth.invalidToken');
    }

    const [u] = await this.find({
      filter: {
        _id: payload._id,
        active: 1,
      },
    });

    if (!u) {
      this.throw(400, 'auth.invalidToken');
    }

    // check if user has logged out
    // after the token was issued
    if (u.lastLogout > new Date(payload.iat * 1000)) {
      this.throw(400, 'auth.loggedOut');
    }

    return {
      user: pick(u, userProps),
      ...this.signTokens(u),
    };
  }

  async refresh({ token }) {
    const { access, refresh } = await this.renewTokens(token);

    return { access, refresh };
  }

  async logout(attrs, user) {
    if (user) {
      await this.model.update(
        { lastLogout: new Date() },
        { _id: user._id },
      );
    }
  }
}

module.exports = new AuthServ(usersModel);
