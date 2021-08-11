require('dotenv').config()
const express = require('express')
const app = express()
const router = require('./routes/userRoute')


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(router)

app.use((req, res, next) => {
  const error = new Error('Not found!')
  error.status = 404
  next(error)
})

app.use((req, res, next) => {
  res.status(error.status || 500)
  res.json({ error: error.message })
})

app.listen(3333, () => {
  console.log('Ok...')
})

module.exports = app