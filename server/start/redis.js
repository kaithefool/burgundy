const redis = require('redis');

const { env } = process;

module.exports = () => {
  const client = redis.createClient({
    url: env.REDIS_URL,
  });

  client.on('error', console.error);

  return client;
};
