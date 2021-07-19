
const expect = require('chai').expect
const request = require('supertest')
const server = require('../server')
const express = require('express')


var app = request.agent(server)

const registerBody = { "email": "testingpurposes@gmail.com", "password": "testing123" }
const actualUserBody = {
    "email": "342424234234@gmail.com",
    "password": "e"
}



describe("Put request to appplications", function () {
    describe("when not logged in", function () {
        it("status should return success", function () {
            app.get('/api/v1/user/applications').end((err, res) => {
                expect(res.body.error).to.equal("404 Page not found")
            })
        })
        it("body should have error property", function () {
            app.get('/api/v1/user/applications').end((err, res) => {
                expect(res.body).to.have.property("error")

            })
        })
        it("status code should be 401 unauthorized", function () {
            app.get('/api/v1/user/applications').end((err, res) => {
                expect(res.statusCode).to.equal(404)
            })
        })
    })
})

describe("Get request to appplications", function () {
    describe("when not logged in", function () {
        it("status should return success", function () {
            app.get('/api/v1/user/applications').end((err, res) => {
                expect(res.body.error).to.equal("404 Page not found")
            })
        })
        it("body should have error property", function () {
            app.get('/api/v1/user/applications').end((err, res) => {
                expect(res.body).to.have.property("error")

            })
        })
        it("status code should be 401 unauthorized", function () {
            app.get('/api/v1/user/applications').end((err, res) => {
                expect(res.statusCode).to.equal(404)
            })
        })
    })
})


describe("Post request to registration route", function () {
    describe("register user", function () {
        it("status should return success", function () {
            app.post('/api/v1/user/register')
                .send(registerBody).end((err, res) => {
                    expect(res.body.status).to.equal("success")
                })
        })

        it("status code should be 200", function () {
            app.post('/api/v1/user/register')
                .send(registerBody).end((err, res) => {
                    expect(res.statusCode).to.equal(200)
                })
        })
    })
})

describe("Post request to login route", function () {
    describe("log user in", function () {
        it("status should return success", function () {
            app.post('/api/v1/user/login')
                .send(actualUserBody).end((err, res) => {

                })
        })

        it("status code should be 500, incorrect user", function () {
            app.post('/api/v1/user/login')
                .send(registerBody).end((err, res) => {
                    expect(res.statusCode).to.equal(500)
                })
        })
    })
})

describe("Post request to application route", function () {
    describe("when not logged in", function () {
        it("status should return success", function () {
            app.post('/api/v1/user/applications')
                .send().end((err, res) => {
                    expect(res.body.error).to.equal("404 Page not found")
                })
        })
        it("body should have error property", function () {
            app.post('/api/v1/user/applications')
                .send().end((err, res) => {
                    expect(res.body).to.have.property("error")

                })
        })
        it("status code should be 404", function () {
            app.post('/api/v1/user/applications')
                .send().end((err, res) => {
                    expect(res.statusCode).to.equal(404)
                })
        })
    })
})





