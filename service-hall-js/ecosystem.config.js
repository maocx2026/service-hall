// Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
module.exports = {
  apps: [
    {
      name: 'szlib-service-hall-js',
      script: './node_modules/.bin/ts-node',
      args: '-T -r tsconfig-paths/register ./server/server.ts',
      instances: 2,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      exec_mode: 'cluster',
      source_map_support: false,
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
};
