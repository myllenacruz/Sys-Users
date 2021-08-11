exports.up = (knex) =>
  knex.schema.createTable('passwordtokens', (table) => {
    table.increments('id')
    table.uuid('token').defaultTo(knex.raw('gen_random_uuid()'))
    table
      .integer('user_id')
      .references('users.id')
      .notNullable()
      .onDelete('CASCADE')
  })

exports.down = (knex) => knex.schema.dropTable('passwordtokens')
