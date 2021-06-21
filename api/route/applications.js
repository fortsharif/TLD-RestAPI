const express = require('express')
const ApplicationsController = require('../controller/applications')

const router = express.Router()

router.route("/").get(ApplicationsController.getApplications).post(ApplicationsController.addApplication)

module.exports = router