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
        return {status: false, error: "The e-mail does not exist!"}
    }
  }
}

module.exports = new PasswordTokens()
