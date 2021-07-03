const ApplicationsDAO = require('../../dao/applicationsDAO')

module.exports = class ApplicationsController {
    static async getApplications(req, res, next) {
        const applicationsPerPage = parseInt(req.query.applicationsPerPage, 10)
        const page = parseInt(req.query.page, 10)

        let filters = {}
        if (req.query.name) {
            filters.name = req.query.name
        } else if (req.query.address) {
            filters.address = req.query.address
        } else if (req.query.occupation) {
            filters.occupation = req.query.occupation
        } else if (req.query.number) {
            filters.number = req.query.number
        }

        const { applicationsList, numberOfApplications, currentCursor } = await ApplicationsDAO.getApplications({ filters, page, applicationsPerPage })

        let response = {
            applications: applicationsList,
            page: page,
            filters: filters,
            entries_per_page: applicationsPerPage,
            current_item: currentCursor,
            total_results: numberOfApplications
        }
        res.status(200).json(response)
    }

    static async addApplication(req, res, next) {
        const address = req.body.address
        const user = {
            name: req.body.name,
            _id: req.body.user_id
        }
        const occupation = req.body.occupation
        const number = req.body.number
        const date = new Date()

        await ApplicationsDAO.addApplication(
            user,
            address,
            number,
            occupation,
            date
        )
        res.status(200).json({ status: "success" })
    }
}