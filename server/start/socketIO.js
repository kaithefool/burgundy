const { Server } = require('socket.io');

const { SOCKET = '0' } = process.env;

const s = {
  io: new Server(),

  attach(server) {
    if (SOCKET === '1') {
      this.io.attach(server);
      this.callbacks.forEach((cb) => cb(this.io));
    }
  },

  callbacks: [],

  onServer(cb) {
    this.callbacks.push(cb);
  },
};

module.exports = {
  io: s.io,
  attach: s.attach.bind(s),
  onServer: s.onServer.bind(s),
};
