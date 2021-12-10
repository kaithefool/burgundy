const accessLogServ = require('../services/accessLogs');

module.exports = (
  action,
  {
    reqPayload = false,
    resPayload = false,
  } = {},
) => async (req, res, next) => {
  const { baseUrl } = req;
  const ip = req.headers['x-forwarded-for']
    || req.connection.remoteAddress;
  const userAgent = req.headers['user-agent'];
  const { user: { _id } = {}, attrs } = req;

  await accessLogServ.create({
    action: `${baseUrl}:${action}`,
    user: _id,
    ip,
    userAgent,
    ...(reqPayload && { reqPayload: JSON.stringify(attrs) }),
    ...(resPayload && { resPayload: JSON.stringify(attrs) }),
  });

  return next();
};
