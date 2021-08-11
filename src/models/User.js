const knex = require('../database')
const bcrypt = require('bcrypt')

class User {
  async userRegis(username, email, password) {
    try {
      const hash = await bcrypt.hash(password, 10)
      await knex
        .insert({ username, email, password: hash, role: 0 })
        .table('users')
    } catch (error) {
      return error
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

  async findByEmail(email) {
    try {
      const result = await knex
        .select(['id', 'username', 'email', 'role', 'password'])
        .where({ email: email })
        .table('users')
      if (result.length > 0) {
        return result[0]
      } else {
        return undefined
      }
    } catch (error) {
      return undefined
    }
  }

  async changePassword(newPassword, id, token) {
    const hash = await bcrypt.hash(newPassword, 10)
    await knex.update({ password: hash }).where({ id: id }).table('users')
  }
}

module.exports = new User()
