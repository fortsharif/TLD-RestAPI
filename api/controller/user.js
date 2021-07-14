const UserDAO = require('../../dao/userDAO')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const salt = 10

module.exports = class UserController {
    static async register(req, res, next) {
        const email = req.body.email
        const password = req.body.password
        let userExists = await UserDAO.userExists(email)
        if (userExists) {
            return res.status(500).json({ error: `Auth failed` })
        }
        bcrypt.hash(password, salt, async (e, hash) => {
            if (e) {
                return res.status(500).json({ error: err })
            }
            await UserDAO.register(email, hash)
        })
        return res.status(200).json({ status: "success" })
    }

    static async login(req, res, next) {
        const email = req.body.email
        const password = req.body.password
        let userExists = await UserDAO.userExists(email)
        if (!userExists) {
            return res.status(500).json({ error: `Auth failed` })
        }
        const checkPassword = await UserDAO.login(email, password)

        bcrypt.compare(password, checkPassword.password, function (e, result) {
            console.log(result);
            if (result) {
                const token = jwt.sign({ email: email }, process.env.JWT,
                    {
                        expiresIn: "10h"
                    })
                res.status(200).json({ status: "success", token: token })
            }
            else if (!result) {
                return res.status(500).json({ error: `Auth failed` })
            }
            if (e) {
                return res.status(500).json({ error: err })
            }

        });
    }
}