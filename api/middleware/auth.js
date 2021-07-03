jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]
        const decoded = jwt.verify(token, process.env.JWT)
        req.userData = decoded;
        next()
    } catch (e) {
        return res.status(404).json({ error: `Auth failed` })
    }
}