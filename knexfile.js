module.exports = {
  development: {
    client: 'pg',
    connection: {
      filename: 'postgres://localhost/palettepicker',
      userNullAsDefault: true,
      migrations: {
        directory: './db/migrations'
      }
    }
  }
};
