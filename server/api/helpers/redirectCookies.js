const ms = require('ms');

module.exports = {
  set(req, res, base = '/') {
    res.cookie(
      'redirect',
      JSON.stringify({
        base, url: req.originalUrl,
      }),
      {
        httpOnly: true,
        sameSite: 'strict',
        maxAge: ms('30m'),
      },
    );
  },

  consume(req, res, base = '/') {
    let { redirect: stored } = req.cookies;

    if (stored !== undefined) {
      res.clearCookie('redirect');

      try {
        stored = JSON.parse(stored);

        if (stored.base === base) {
          return res.redirect(stored.url);
        }
      } catch (error) {
        // do nothing
      }
    }

    return res.redirect(base);
  },
};
