const knex = require('../database')
const bcrypt = require('bcrypt')

class User {
  async userRegis(username, email, password) {
    try {
      let hash = await bcrypt.hash(password, 10)
      await knex
        .insert({ username, email, password: hash, role: 0 })
        .table('users')
    } catch (error) {
      console.log(error)
    }
  }

  async findById(id) {
    try {
      const result = await knex
        .select(['id', 'username', 'email', 'role', 'password'])
        .where({ id: id })
        .table('users')
      return result
    } catch (error) {
      return undefined
    }
  }
}

module.exports = new User()
