const { application } = require('express')
const express = require('express')

const UserController = require('../controller/user')

const router = express.Router()






/**
 * @swagger
 * /api/v1/user/register:
 *  post:
 *   summary: Register a user to database
 *   tags:
 *    - User
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
 *     description: User created
 *    500:
 *     description: Error user may already exist   
 */
router.post("/register", UserController.register)

/**
 * @swagger
 * /api/v1/user/login:
 *  post:
 *   summary: Authenticate user login
 *   tags:
 *   - User
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
 *     description: Success
 *    500:
 *     description: Auth failed
 */
router.post("/login", UserController.login)

module.exports = router