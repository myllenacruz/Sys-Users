const express = require('express')
const router = express.Router()
const UserController = require('../controllers/UserController')

router.get('/users', UserController.index)
router.post('/users', UserController.create)
router.put('/users/:id', UserController.update)
router.get('/users/:id', UserController.findUser)
router.delete('/users/:id', UserController.delete)


module.exports = router
