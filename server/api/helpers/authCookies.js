const ms = require('ms');

const {
  HTTPS,
  JWT_ACCESS_TTL,
  JWT_REFRESH_TTL,
} = process.env;

const cookieOpts = {
  secure: HTTPS === '1',
  httpOnly: true,
  sameSite: 'strict',
};

module.exports = {
  get(req) {
    const {
      'access.id': access,
      'refresh.id': refresh,
    } = req.cookies;

    return { access, refresh };
  },

  set(res, tokens) {
    const { access, refresh, persist = false } = tokens;

    res.cookie('access.id', access, {
      ...cookieOpts,
      ...persist && { maxAge: ms(JWT_ACCESS_TTL) },
    });
    res.cookie('refresh.id', refresh, {
      ...cookieOpts,
      ...persist && { maxAge: ms(JWT_REFRESH_TTL) },
    });
  },

  clear(res) {
    res.clearCookie('access.id');
    res.clearCookie('refresh.id');
  },
};
