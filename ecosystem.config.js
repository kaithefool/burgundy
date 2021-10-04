const {
  name,
  repository: { url: repo },
} = require('./package.json');

const postSetup = () => [
  'mkdir -p ../shared/commons',
  'cp -n .env-example ../shared/commons/.env',
].join(' && ');

const postDeploy = (env) => [
  'npm ci',
  `pm2 reload ecosystem.config.js --env ${env}`,
].join(' && ');

module.exports = {
  apps: [{
    script: './server/bin/www',
    max_memory_restart: '1G',
    env: { NODE_ENV: 'development' },
    env_uat: { NODE_ENV: 'uat' },
    env_prd: { NODE_ENV: 'production' },
  }],

  deploy: {
    dev: {
      user: 'SSH_USERNAME',
      host: 'SSH_HOSTMACHINE',
      ref: 'origin/master',
      repo,
      path: `/home/ubuntu/www-nodejs/${name}`,
      'pre-deploy-local': '',
      'post-deploy': postDeploy('dev'),
      'pre-setup': ''
    }
  }
};
