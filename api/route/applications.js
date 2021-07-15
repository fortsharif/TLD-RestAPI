const express = require('express')
const ApplicationsController = require('../controller/applications')
const auth = require('../middleware/auth')
const adminauth = require('../middleware/adminauth')


const router = express.Router()

router.get("/", adminauth, ApplicationsController.getApplications)

router.post("/", auth, ApplicationsController.addApplication)

module.exports = router