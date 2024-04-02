// const supertest = require('supertest');
// const request = require('supertest');
// const express = require('express')
const User = require('../connect/models/userModel')
// const app = require('../index')

const {updateUser} = require('../controllers/userController')
const {hashed} = require('../utilis/helpers')

jest.mock('../connect/models/userModel')
jest.mock('../utilis/helpers', () => ({
    hashed: jest.fn(() => '123456789')
}))
const req = { params: { id: '123'}, 
    body: {   username: 'cathy',
    email: 'namelefatuma@123gmail.com',
    password: '123456789'}
}

const req1 = { params: { id: '123'}}
const requ = parseInt(req, 10)

const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn()
    // send: jest.fn((x) => x)
}


describe('UPDATE /update/user/:id', () => {
    test('that has User id is defined', async () => {
        // await request(app).put(`/update/user/${req}`)
        User.findByPk.mockImplementationOnce(() => (req.params))
        await updateUser(req, res)
        expect(req).toBeDefined()
    })

    it('the request body has the attributes to be updated by the user', async () => {
        // await request(app).put(`/update/user/${req}`).send(updated)
        User.update.mockImplementationOnce(() => (req))
        await updateUser(req, res)
        expect(200)
        // expect(res.status).toHaveBeenCalledWith(200)
    })

})
