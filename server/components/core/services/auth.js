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
        SECRET,
        { expiresIn: JWT_ACCESS_TTL },
      ),
      refresh: jwt.sign(
        { id: user.id },
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
      id: payload.id,
      active: 1,
    });

    if (!u) {
      this.throw(400, 'auth.invalidToken');
    }

    // check if user has logged out
    // after the token was issued
    if (u.last_logout > new Date(payload.iat * 1000)) {
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
        { last_logout: new Date() },
        { id: user.id },
      );
    }
  }
}

module.exports = new AuthServ(usersModel);
