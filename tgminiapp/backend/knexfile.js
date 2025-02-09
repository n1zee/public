require('dotenv')
  .config({ path: `${__dirname}/.env` });

module.exports[process.env.NODE_ENV || 'dev'] = {
  client: 'pg',
  connection: process.env.DATABASE_CONNECTION,
  pool: {
    min: 1,
    max: 1,
  },
  migrations: {
    tableName: '_migrations',
    directory: './_database/migrations',
  },
  seeds: {
    directory: './_database/seeds',
  },
};
