const {
  name,
  repository: { url: repo },
} = require('./package.json');

const postSetup = () => [
  'mkdir -p ../shared/public ../shared/private',
  'ln -sf ../shared/public .',
  'ln -sf ../shared/private .',
].join(' && ');

const postDeploy = (env) => [
  'npm run build',
  `pm2 startOrReload ecosystem.config.js --env ${env}`,
].join(' && ');

const scripts = (env) => ({
  'post-deploy': postDeploy(env),
  'post-setup': postSetup(env),
});

module.exports = {
  apps: [{
    script: './server/bin/www',
    max_memory_restart: '1G',
    instances: 'max',
    env: { NODE_ENV: 'development' },
    env_uat: { NODE_ENV: 'uat' },
    env_prd: { NODE_ENV: 'production' },
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
