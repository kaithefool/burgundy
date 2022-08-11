const _ = require('lodash');

const io = require('../../start/io');

const findSockets = async (userId) => {
  const uIds = _.castArray(userId);

  const ss = await Promise.all(
    uIds.map((uId) => io.in(`user.${uId}`).fetchSockets()),
  );

  return ss.flat();
};

const joinRoom = async (userId, room) => {
  const sockets = await findSockets(userId);

  sockets.forEach((s) => s.join(room));
};

const leaveRoom = async (userId, room) => {
  const sockets = await findSockets(userId);

  sockets.forEach((s) => s.leave(room));
};

module.exports = {
  findSockets,
  joinRoom,
  leaveRoom,
};
