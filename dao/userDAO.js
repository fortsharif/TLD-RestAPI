const { ObjectId } = require("mongodb")




let users

module.exports = class AplicationsDAO {
    static async injectDB(connection) {
        if (users) {
            return
        }
        try {
            users = await connection.db(process.env.TLD_NS).collection("users")
        } catch (e) {
            console.error(`Couldnt connect to the database: ${e}`);
        }

    }

    static async register(email, password, type = 0) {
        try {
            const user = { email: email, password: password, type: type }
            return await users.insertOne(user)

        } catch (e) {
            console.error(`error adding user to database ${e}`);
            return {
                error: e
            }
        }
    }

    static async userExists(email) {
        try {

            let query = { email: { $eq: email } }
            let cursor = await users.findOne(query)
            if (cursor !== null) {
                return true
            } else if (cursor === null) {
                return false
            }

        } catch (e) {
            console.error(`error accessing database to check if user exists : ${e}`)
        }
    }

    static async login(email, password) {
        try {


            let query = { email: { $eq: email } }
            let cursor = await users.findOne(query)
        } catch (e) {
            console.error(`error trying to login: ${e}`);
            return { error: e }
        }
    }
}