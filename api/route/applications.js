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

/**
 * @swagger
 * /api/v1/applications:
 *  get:
 *   summary: Get list of applications
 *   security:
 *    - bearerAuth: 
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT 
 *   tags:
 *    - Application
 *   parameters:
 *    - in: query
 *      name: name
 *      schema:
 *       type: string
 *      description: The name of applicant to filter for
 *    - in: query
 *      name: address
 *      schema:
 *       type: string
 *      description: The address of applicant to filter for
 *    - in: query
 *      name: occupation
 *      schema:
 *       type: string
 *      description: The occupation of applicant to filter for
 *    - in: query
 *      name: number
 *      schema:
 *       type: integer
 *      description: The mobile number of applicant to filter for
 *    - in: query
 *      name: status
 *      schema:
 *       type: string
 *      description: The application status of applicantions to filter for
 *   responses:
 *    200:
 *     description: Success
 *    401:
 *     description: Unauthorized
 */
router.get("/", adminauth, ApplicationsController.getApplications)

/**
 * @swagger
 * /api/v1/applications/update:
 *  put:
 *   summary: Update application status for a specific user
 *   security:
 *    - bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *   tags:
 *    - Application
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        email:
 *         type: string
 *        password:
 *         type: string
 *   responses:
 *    200:
 *     description: success updated application
 *    401:
 *     description: couldn't update application, unauthorized
 */
router.put("/update", adminauth, ApplicationsController.updateApplication)

/**
 * @swagger
 * /api/v1/applications/status:
 *  get:
 *   summary: Get status of current users application
 *   security:
 *    - bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *   tags:
 *    - Application
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *       email:
 *        type: string
 *   responses:
 *    200:
 *     description: Success application updated
 *    401:
 *     description: Unauthorized access to application
 */
router.get("/status", auth, ApplicationsController.getApplication)

/**
 * @swagger
 * /api/v1/applications:
 *  post:
 *   summary: Register a user to database
 *   security:
 *    - bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *   tags:
 *    - Application
 *   consumes:
 *    - multipart/form-data:
 *   parameters:
 *    - in: formData
 *      name: image
 *      type: file
 *      description: Image of property
 *    - in: formData
 *      name: name
 *      type: string
 *      description: Name of user submitting application
 *      required: true
 *    - in: formData
 *      name: address
 *      type: string
 *      required: true
 *      description: Address of user submitting application
 *    - in: formData
 *      name: occupation
 *      type: string
 *      required: true
 *      description: Occupation of user submitting application
 *    - in: formData
 *      name: number
 *      type: integer
 *      required: true
 *      description: Number of user submitting application
 *   responses:
 *    200:
 *     description: Success application added
 *    400:
 *     description: Couldn't add application
 */
router.post("/", [auth, upload.single('image')], ApplicationsController.addApplication)

module.exports = router