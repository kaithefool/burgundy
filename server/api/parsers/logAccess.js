const accessLogServ = require('../services/accessLogs');

module.exports = (action) => async (req, res, next) => {
  const ip = req.headers['x-forwarded-for']
    || req.connection.remoteAddress;
  const userAgent = req.headers['user-agent'];
  const { user: { _id } = {} } = req;

  await accessLogServ.create({
    action,
    user: _id,
    ip,
    userAgent,
  });

  return next();
};
