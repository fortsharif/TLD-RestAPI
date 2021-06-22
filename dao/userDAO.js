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
            return { error: e }
        }
    }
}