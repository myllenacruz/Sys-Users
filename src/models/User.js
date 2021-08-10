const knex = require('../database')
const express = require('express')
const bcrypt = require('bcrypt')
const { resourceLimits } = require('worker_threads')

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
}

module.exports = new User()
