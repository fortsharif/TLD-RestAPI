const express = require('express')
const ApplicationsController = require('../controller/applications')
const auth = require('../middleware/auth')
const adminauth = require('../middleware/adminauth')
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'images/')
    },
    filename: function (req, file, cb) {

        cb(null, req.userData.email + ".jpg")
    }


})
const upload = multer({ storage })


const router = express.Router()

router.get("/", adminauth, ApplicationsController.getApplications)

router.get("/status", auth, ApplicationsController.getApplication)

router.post("/", [auth, upload.single('image')], ApplicationsController.addApplication)

module.exports = router