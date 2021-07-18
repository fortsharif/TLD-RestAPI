const ApplicationsDAO = require('../../dao/applicationsDAO')
const nodemailer = require('nodemailer')
const multer = require('multer')

module.exports = class ApplicationsController {
    static async getApplications(req, res, next) {
        const applicationsPerPage = req.query.applicationsPerPage ? parseInt(req.query.applicationsPerPage, 8) : 8
        const page = req.query.page ? parseInt(req.query.page, 10) : 0
        console.log(req.userData)
        let filters = {}
        if (req.query.name) {
            filters.name = req.query.name
        } else if (req.query.address) {
            filters.address = req.query.address
        } else if (req.query.occupation) {
            filters.occupation = req.query.occupation
        } else if (req.query.number) {
            filters.number = req.query.number
        } else if (req.query.status) {
            filters.status = req.query.status
        }

        const { applicationsList, numberOfApplications, currentCursor } = await ApplicationsDAO.getApplications({ filters, page, applicationsPerPage })

        let response = {
            applications: applicationsList,
            page: page,
            filters: filters,
            entries_per_page: applicationsPerPage,
            current_item: currentCursor + applicationsPerPage,
            total_results: numberOfApplications
        }
        res.status(200).json(response)
    }

    static async updateApplication(req, res, next) {
        const email = req.body.email
        const status = req.body.status
        const updated = await ApplicationsDAO.updateApplication(email, status)

        if (updated) {
            res.status(200).json({ status: "success" })
        } else {

            res.status(401).json({ error: "couldn't update application" })

        }
    }

    static async addApplication(req, res, next) {
        const address = req.body.address
        console.log(req.file)
        const user = {
            name: req.body.name,
            _id: req.userData.email
        }
        const occupation = req.body.occupation
        const number = req.body.number
        const image = req.file.path
        const date = new Date()

        const added = await ApplicationsDAO.addApplication(
            user,
            address,
            number,
            occupation,
            date,
            image
        )


        if (added) {
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: "huseinsharif.96@gmail.com",
                    pass: process.env.PASSWORD
                }
            })

            const mailOptions = {
                from: "huseinsharif.96@gmail.com",
                to: "huseinsharif.96@gmail.com",
                subject: 'NEW APPLICATION',
                text: `New application details \n name: ${user.name} \n address: ${address} \n number: ${number} \n occupation: ${occupation} `
            }

            transporter.sendMail(mailOptions, (err, data) => {
                if (err) {
                    console.log('Error Occurs', err)
                } else {
                    console.log('Success email has been sent')
                }
            })

            res.status(200).json({ status: "success" })
        }
        else {
            res.status(400).json({ error: "couldn't add application" })
        }
    }

    static async getApplication(req, res, next) {
        const emailCheck = req.userData.email
        console.log(emailCheck)
        const application = await ApplicationsDAO.getApplication(emailCheck)

        if (application.user_id == emailCheck) {
            res.status(200).json(application)
        }
        else {
            res.status(401).json({ error: "Unauthorized access to application" })
        }

    }
}