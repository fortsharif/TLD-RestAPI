const UserDAO = require('../../dao/userDAO')
const bcrypt = require('bcrypt')
const salt = 10

module.exports = class UserController {
    static async register(req, res, next) {
        const email = req.body.email
        const password = req.body.password
        bcrypt.hash(password, salt, async (err, hash) => {
            await UserDAO.register(email, password)
        })
        res.json({ status: "success" })
    }
}