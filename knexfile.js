module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/palettepicker',
    userNullAsDefault: true,
    migrations: {
      directory: './db/migrations'
    }
  }
};
