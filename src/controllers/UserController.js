const User = require('../models/User')
const knex = require('../database')

module.exports = {
  async index(req, res) {
    const results = await knex('users')
    return res.json(results)
  },

  async create(req, res, next) {
    try {
      const { username, email, password, role } = req.body
      await User.userRegis(username, email, password, role)
      return res.status(201).send()
    } catch (error) {
      return next(error)
    }
  },

  async update(req, res, next) {
    try {
      const { username } = req.body
      const { id } = req.params
      await knex('users').update({ username }).where({ id })
      return res.send()
    } catch (error) {
      return next(error)
    }
  },

  async delete(req, res, next) {
    try {
      const { id } = req.params
      await knex('users').where({ id }).del()
      return res.status(200).json('User deleted!')
    } catch (error) {
      return next(error)
    }
  },
}
