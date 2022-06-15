const { Server } = require('socket.io');
const { createAdapter } = require('@socket.io/redis-adapter');

const redis = require('./redis');

const { SOCKET = '' } = process.env;

let allowRequest = (req, cb) => cb(null, true);

const io = new Server({
  allowRequest: (...args) => allowRequest(...args),
});

io.allowRequest = (handler) => {
  allowRequest = handler;
};
io.init = (server) => {
  if (SOCKET === '1') {
    io.adapter(createAdapter(redis(), redis()));
    io.listen(server);
  }
};

module.exports = io;
