const accessLogServ = require('../services/accessLogs');

module.exports = (
  action,
  recordPayload = false,
) => async (req, res, next) => {
  const ip = req.headers['x-forwarded-for']
    || req.connection.remoteAddress;
  const userAgent = req.headers['user-agent'];
  const { user: { _id } = {}, attrs } = req;

  await accessLogServ.create({
    action,
    user: _id,
    ip,
    userAgent,
    ...(recordPayload && { payload: JSON.stringify(attrs) }),
  });

  return next();
};
