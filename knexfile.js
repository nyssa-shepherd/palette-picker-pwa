module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/palettepicker',
    userNullAsDefault: true,
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds/dev'
    }
  }
};
