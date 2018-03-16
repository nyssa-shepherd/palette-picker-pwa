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
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL + `?ssl=true`,
    migrations: {
      directory: './db/migrations'
    },
    useNullAsDefault: true

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
>>>>>>> 405e61d7966a18f223218fedb5266937f90bc6b5
  }
};
