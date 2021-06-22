const express = require('express')
const UserController = require('../controller/user')

const router = express.Router()

router.route("/register").post(UserController.register)
//router.route("/login").post(UserController.login)

module.exports = router