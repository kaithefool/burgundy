const ms = require('ms');

const {
  env: { https, jwt: { accessTtl, refreshTtl } },
} = process;

const cookieOpts = {
  secure: https === '1',
};

module.exports = {
  get(req) {
    const {
      'access.id': access,
      'refresh.id': refresh,
    } = req.cookies;

    return { access, refresh };
  },

  set(res, tokens, { persist = true } = {}) {
    const { access, refresh } = tokens;

    res.cookie('access.id', access, {
      ...cookieOpts,
      httpOnly: true,
      sameSite: 'strict',
      ...(persist ? {
        maxAge: ms(accessTtl),
      } : {}),
    });
    res.cookie('refresh.id', refresh, {
      ...cookieOpts,
      httpOnly: true,
      sameSite: 'strict',
      ...(persist ? {
        maxAge: ms(refreshTtl),
      } : {}),
    });
  },

  clear(res) {
    res.clearCookie('access.id');
    res.clearCookie('refresh.id');
  },
};
