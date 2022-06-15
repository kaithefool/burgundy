const { parse, serialize } = require('cookie');

const io = require('../start/io');

io.allowRequest((req, cb) => {
  req.cookies = parse(req.headers.cookie);

  req.res.setHeader('Set-Cookie', [
    serialize('foo', 'meh', { expires: 0 }),
  ]);

  return cb(null, true);
});
