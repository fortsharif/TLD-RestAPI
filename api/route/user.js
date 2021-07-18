const express = require('express')
const UserController = require('../controller/user')

const router = express.Router()



router.post("/register", UserController.register)

router.post("/login", UserController.login)

module.exports = router