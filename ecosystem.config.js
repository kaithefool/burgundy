const postDeploy = [
  'ln -sf ../shared .',
  'npm i && npm run build',
  'pm2 startOrRestart ecosystem.config.js --env prod',
].join(' && ');

module.exports = {
  apps: [{
    name: 'burgundy',
    script: './bin/www',

    instances: 1,
    autorestart: true,
    max_memory_restart: '1G',
    ignore_watch: ['assets', 'commons', 'public'],
    env: {
      NODE_ENV: 'development',
    },
    env_prod: {
      NODE_ENV: 'production',
    },
  }],

  deploy: {
    prod: {
      host: 'burgundy-prod',
      port: '22',
      ref: 'origin/master',
      repo: 'git://git@github.com/kaithefool/burgundy.git',
      path: '/home/ubuntu/www/burgundy',
      'post-deploy': postDeploy,
    },
  },
};
