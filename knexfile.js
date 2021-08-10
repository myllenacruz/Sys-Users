module.exports = {
  development: {
    client: 'pg',
    connection: {
      database: 'uknex',
      user: 'postgres',
      password: 'admin'
    },
    migrations: {
      tableName: 'knex_users',
      directory: `${__dirname}/src/database/migrations`
    },
    seeds: {
      directory: `${__dirname}/src/database/seeds`
    },
  },
}
