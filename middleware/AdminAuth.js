const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = function (req, res, next) {
  const token = req.body.token || req.headers.authorization
  if (!token) {
    res.status(401).json({ message: 'Invalid token!' })
  } else {
    jwt.verify(token, '' + process.env.KEY_JWT, function (error, decoded) {
      if (error) {
        res.status(401).json({ message: 'Invalid token!' })
      } else {
        if (decoded.role == 1) {
          next()
        } else {
          res.status(401).json({ message: 'You are not authenticated!' })
        }
      }
    })
  }
}
