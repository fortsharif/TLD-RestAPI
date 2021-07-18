const { ObjectId } = require("mongodb")

let applications

module.exports = class AplicationsDAO {
    static async injectDB(connection) {
        if (applications) {
            return
        }
        try {
            applications = await connection.db(process.env.TLD_NS).collection("applications")
        } catch (e) {
            console.error(`Couldnt connect to the database: ${e}`);
        }
    }

    static async getApplications({ filters = null, page = 0, applicationsPerPage = 5 } = {}) {
        let query
        if (filters) {
            if ("name" in filters) {
                query = { $text: { $search: filters["name"] } }
            } else if ("address" in filters) {
                query = { "address": { $eq: filters["address"] } }
            } else if ("number" in filters) {
                query = { "number": { $eq: filters["number"] } }
            } else if ("occupation" in filters) {
                query = { "occupation": { $eq: filters["occupation"] } }
            } else if ("status" in filters) {
                query = { "status": { $eq: filters["status"] } }
            }
        }

        let cursor
        try {
            cursor = await applications.find(query)
        } catch (e) {
            console.error(`couldnt find query ${e}`);
            return { applicationsList: [], numberOfApplications: 0 }
        }

        const displayCursor = cursor.limit(applicationsPerPage).skip(applicationsPerPage * page)
        const currentCursor = applicationsPerPage * page
        try {
            const applicationsList = await displayCursor.toArray()
            const numberOfApplications = await applications.countDocuments(query)
            return { applicationsList, numberOfApplications, currentCursor }
        } catch (e) {
            console.error(`problem counting documents or converting to array: ${e}`)
            return { applicationsList: [], numberOfApplications: 0, currentCursor: 0 }

        }
    }

    static async updateApplication(email, status) {
        try {
            let filter = { user_id: email }
            console.log(status)
            let update = { status: status }
            const options = { returnNewDocument: true }
            const nn = await applications.findOneAndUpdate(filter, { $set: update }, options)
            console.log(nn)

            return true

        } catch (e) {
            console.error(`Unable to update application ${e}`)
            return false
        }
    }

    static async addApplication(user, address, number, occupation, date, image) {
        try {
            const applicationDoc = { name: user.name, user_id: user._id, date: date, address: address, number: number, occupation: occupation, image, status: "new" }
            await applications.insertOne(applicationDoc)
            return true
        } catch (e) {
            console.error(`Unable to add application ${e}`)
            return false
        }
    }

    static async getApplication(email) {
        try {
            let query = { user_id: { $eq: email } }
            let cursor = await applications.findOne(query)
            console.log(cursor)
            return cursor
        } catch (e) {
            console.error(`no applications ${e}`)
        }
    }
}