exports.up = (knex) =>
  knex.schema.table('users', (table) => {
    table.text('email', 150).unique().notNullable(),
      table.varchar('password', 200).notNullable(),
      table.integer('role')
  })

exports.down = (knex) =>
  knex.schema.table('users', (table) => {
    table.dropColumn('email, password, role')
  })
