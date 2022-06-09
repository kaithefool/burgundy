const { Server } = require('socket.io');

const { SOCKET = '0' } = process.env;

module.exports = SOCKET === '1'
  ? new Server()
  : null;
