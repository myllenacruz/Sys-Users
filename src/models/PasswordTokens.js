const knex = require('../database')
const User = require('../models/User')
const { v4: uuidv4 } = require('uuid')

class PasswordTokens {
  async create(email) {
    const users = await User.findByEmail(email)
    if (users != undefined) {
      try {
        const token = uuidv4()
        await knex
          .insert({
            user_id: users.id,
            used: 0,
            token: token,
          })
          .table('passwordtokens')
        return { status: true, token: token }
      } catch (error) {
        console.log(error)
        return { status: false, error: error }
      }
    } else {
      return { status: false, error: 'The e-mail does not exist!' }
    }
  }

  async validate(token) {
    try {
      const result = await knex
        .select()
        .where({ token: token })
        .table('passwordtokens')
      if (result.length > 0) {
        const tk = result[0]
        if (tk.used) {
          return { status: false }
        } else {
          return { status: true, token: tk }
        }
      } else {
        return { status: false }
      }
    } catch (error) {
      console.log(error)
      return false
    }
  }

  async setUsed(token) {
    await knex
      .update({ used: 1 })
      .where({ token: token })
      .table('passwordtokens')
  }
}

module.exports = new PasswordTokens()
