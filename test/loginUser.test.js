
const User = require('../connect/models/userModel')
const {loginUser }= require('../routes/loginUser')
const {hashPassword} = require('../utilis/helpers')

jest.mock('../connect/models/userModel')

jest.mock('../utilis/helpers', () => ({
    hashPassword: jest.fn(() => '123456789')
}))

// moking or giving fake data to the test
const userData = {
    body: {
    username: 'fake_username', 
    password: 'fake_password'
    }
};
const userData1 = {
    body: {
    username: null, 
    password: null
    }
};

const res = {
    status: jest.fn((x) => x),
    json: jest.fn((x) => x),
    token: jest.fn(() => 'token'),
}


describe('POST /login/user', () => {
     
    describe('given a username and password', () => {
        // should save the username and password to the database
        // should specify json in the content type header
        // should respond with a json object containing username
        // should hash the password before sending it to the database

        test("should respond with a status code 200", async () => {

            User.findOne.mockImplementationOnce(() => ({
                username: 'fatuma',
                password: '123456789'
            }))


            await loginUser(userData, res)
            expect(res.status).toHaveBeenCalledWith(200);
        })
        test('that the passwords are matching', async () => {
            User.findOne.mockResolvedValueOnce(() => ({
                username: 'fatuma',
                password: '123456789'
            }))

            await loginUser(userData, res)
            expect(hashPassword).toHaveBeenCalledWith("fake_password", '123456789')

        })
    })

    describe('when the username and password is missing', () => {
        test('username and password are not given', async () => {
            User.findOne.mockImplementationOnce(() => ({
                username:'',
                password:''
            }))

            await loginUser(userData1, res)
            expect(userData1.body.password && userData1.body.username).toBeNull()
            expect(res.status).toHaveBeenCalledWith(401);
        })
    

    })
})