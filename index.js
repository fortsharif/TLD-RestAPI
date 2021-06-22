const app = require('./server.js')
const mongodb = require('mongodb')
const dotenv = require('dotenv')
const UserDAO = require('./dao/userDAO')
const ApplicationsDAO = require('./dao/applicationsDAO')

dotenv.config()

const MongoClient = mongodb.MongoClient

const port = process.env.PORT || 8000

MongoClient.connect(process.env.TLD_DB_URI,
    {
        poolSize: 20,
        wtimeout: 5000,
        useNewUrlParser: true
    })
    .catch(err => {
        console.error(err)
        process.exit(1)
    })
    .then(async client => {
        await ApplicationsDAO.injectDB(client)
        await UserDAO.injectDB(client)
        app.listen(port, () => {
            console.log(`Listening on port ${port}`);
        })
    })