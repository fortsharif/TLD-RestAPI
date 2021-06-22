const express = require('express')
const cors = require('cors')
const applications = require('./api/route/applications')
const user = require('./api/route/user')

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/v1/applications", applications)
app.use("/api/v1/user", user)
app.use("*", (req, res) => res.status(404).json({ error: "404 Page not found" }))

module.exports = app