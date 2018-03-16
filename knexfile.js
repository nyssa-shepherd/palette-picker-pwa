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
  }, 
  test: {
    client: 'pg',
    connection: 'postgres://localhost/testpalettepicker',
    useNullAsDefault: true,
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds/test'
    }
  }
};
