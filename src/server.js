const express = require('express')
const app = express()
const router = require('./routes/userRoute')

app.use(router)

app.listen(3333, () => {
  console.log('Ok...')
})
