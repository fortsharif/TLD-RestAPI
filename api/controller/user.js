const UserDAO = require('../../dao/userDAO')
const bcrypt = require('bcrypt')
const salt = 10

module.exports = class UserController {
    static async register(req, res, next) {
        const email = req.body.email
        const password = req.body.password
        let userExists = await UserDAO.userExists(email)
        if (userExists) {
            return res.status(500).json({ error: `email already exists` })
        }
        bcrypt.hash(password, salt, async (e, hash) => {
            if (e) {
                return res.status(500).json({ error: err })
            }
            await UserDAO.register(email, hash)
        })
        return res.json({ status: "success" })
    }

    static async login(req, res, next) {
        const email = req.body.email
        const password = req.body.password
        const checkPassword = await UserDAO.login(email, password)
        console.log(checkPassword);
        bcrypt.compare(password, checkPassword.password, function (e, result) {
            console.log(result);
            if (result) {
                res.json({ status: "success" })
            }
            else if (!result) {
                return res.status(500).json({ error: `Wrong password or email` })
            }
            if (e) {
                return res.status(500).json({ error: err })
            }

        });
    }
}