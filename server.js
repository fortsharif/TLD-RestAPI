const express = require('express')
const cors = require('cors')
const applications = require('./api/route/applications')
const user = require('./api/route/user')
const auth = require('./api/middleware/auth')
const adminauth = require('./api/middleware/adminauth')
const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUI = require('swagger-ui-express')

const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: 'Trading License API',
            version: '1.0.0',
            description: 'Express API for the trading license department'
        }
    },
    apis: ['api/route/*.js']
}

const openapiSpecification = swaggerJsDoc(swaggerOptions)
console.log(openapiSpecification)

const app = express()

app.use(cors())
app.use(express.json())
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(openapiSpecification))

app.use("/api/v1/applications", applications)
app.use("/api/v1/user", user)
app.use(express.static('images'))
app.use("*", (req, res) => res.status(404).json({ error: "404 Page not found" }))


module.exports = app