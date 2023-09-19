const { join } = require('node:path')

module.exports = {
  development: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
      filename: join(__dirname, 'dev.sqlite3'),
    },
    pool: {
      afterCreate: (conn, cb) => conn.run('PRAGMA foreign_keys = ON', cb),
    },
  },

  test: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
      filename: ':memory:',
    },
    migrations: {
      directory: join(__dirname, 'migrations'),
    },
    seeds: {
      directory: join(__dirname, 'seeds'),
    },
    pool: {
      afterCreate: (conn, cb) => conn.run('PRAGMA foreign_keys = ON', cb),
    },
  },

  production: {
    // client: 'sqlite3',
    // useNullAsDefault: true,
    // connection: {
    //   filename: join(__dirname, 'dev.sqlite3'),
    // },
    // pool: {
    //   afterCreate: (conn, cb) => conn.run('PRAGMA foreign_keys = ON', cb),
    // },
    client: 'pg',
    connection: {
      host: process.env.DATABASE_URL,
      port: process.env.DATABASE_PORT,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_DATABASE,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },
}
