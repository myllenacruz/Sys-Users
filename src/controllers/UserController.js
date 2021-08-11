const User = require('../models/User')
const knex = require('../database')

module.exports = {
  async index(req, res) {
    const results = await knex
      .select(['id', 'username', 'email', 'role', 'created_at', 'updated_at'])
      .table('users')
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
      const { username, email, role } = req.body
      const { id } = req.params
      await knex('users').update({ username, email, role }).where({ id: id })
      return res.send('Updated successfully!')
    } catch (error) {
      return next(error)
    }
  },

  async findUser(req, res) {
    try {
      const { id } = req.params
      const user = await User.findById(id)
      return res.json(user)
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
