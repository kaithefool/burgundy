const {
  name,
  repository: { url: repo },
} = require('./package.json');

const postSetup = () => [
  'mkdir -p ../shared/secrets',
  'touch ../shared/secrets/.env',
  'mkdir -p ../shared/uploads',
  'ln -sf ../shared/uploads .',
].join(' && ');

const postDeploy = (env) => [
  'npm run i:server',
  `pm2 startOrReload ecosystem.config.js --env=${env}`,
].join(' && ');

const scripts = (env) => ({
  'post-deploy': postDeploy(env),
  'post-setup': postSetup(env),
});

module.exports = {
  apps: [{
    name,
    script: './server/bin/www',
    max_memory_restart: '1G',
    instances: 'max',
    node_args: '--env-file ../shared/secrets/.env',
    env: { NODE_ENV: 'development' },
    env_uat: { NODE_ENV: 'uat' },
    env_prd: { NODE_ENV: 'production' },
    time: true,
  }],

  deploy: {
    uat: {
      user: 'SSH_USERNAME',
      host: 'SSH_HOSTMACHINE',
      ref: 'origin/master',
      repo,
      path: `/home/ubuntu/www-nodejs/${name}`,
      ...scripts('uat'),
    }
  }
};
