const mongoose = require('mongoose');
const tunnel = require('tunnel-ssh');
const fs = require('fs');

const { env } = process;

let db;

const sshConfig = {
  host: env.MONGO_SSH_HOST,
  username: env.MONGO_SSH_USER,
  port: env.MONGO_SSH_PORT || 22,
  dstPort: env.MONGO_SSH_DST_PORT,
  localPort: env.MONGO_SSH_LOCAL_PORT,
};

if (env.MONGO_SSH_KEY) {
  sshConfig.privateKey = fs.readFileSync(env.MONGO_SSH_KEY);
}
if (env.MONGO_SSH_PASSWORD) {
  sshConfig.password = env.MONGO_SSH_PASSWORD;
}

function connect() {
  db = mongoose.connect(env.MONGO_URI, {
    autoIndex: false, // auto index is handled in Model
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });
}

if (env.MONGO_SSH_HOST) {
  tunnel(sshConfig, () => {
    connect();
  });
} else {
  connect();
}

module.exports = db;
