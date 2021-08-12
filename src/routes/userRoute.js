const express = require('express')
const router = express.Router()
const UserController = require('../controllers/UserController')
const AdminAuth = require('../../middleware/AdminAuth')

router.get('/users', AdminAuth, UserController.index)
router.post('/users', AdminAuth, UserController.create)
router.put('/users/:id', AdminAuth, UserController.update)
router.get('/users/:id', UserController.findUser)
router.delete('/users/:id', AdminAuth, UserController.delete)
router.post('/recoverpassword', UserController.recoverPassword)
router.post('/changepassword', UserController.changePassword)
router.post('/login', UserController.login)

module.exports = router
