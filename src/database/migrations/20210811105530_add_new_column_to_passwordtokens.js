exports.up = (knex) =>
  knex.schema.table('passwordtokens', (table) => {
    table.smallint('used').unsigned().notNullable()
  })

exports.down = (knex) =>
  knex.schema.table('passwordtokens', (table) => {
    table.dropColumn('used')
  })
