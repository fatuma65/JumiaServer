
const User = require('../connect/models/userModel')
const {createUser, getAllUsers,  getUser, deleteUser} = require('../controllers/userController')
const {hashed} = require('../utilis/helpers')


// // what we are going to test

jest.mock('../connect/models/userModel')
jest.mock('../utilis/helpers', () => ({
    hashed: jest.fn(() => '123456789')
}))

const userData = {
    body: {
    id: '345',
     firstName: 'John',
     lastName: 'Doe',
     email: 'john@example.com',
     username: 'john',
     password: '123456789'
    }
};
const userData1 = {
    body: {
     firstName: null,
     lastName: null,
     email: null,
     username: null,
     password: null
    }
};
const users = [
    {   
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        username: 'john',
        password: '123456789'
    },
    {   
        firstName: 'cathy',
        lastName: 'fatuma',
        email: 'fatuma@example.com',
        username: 'cathy',
        password: '123456789'
    }
]

const res = {
    status: jest.fn((x) => x),
    json: jest.fn(),
    // send: {},
}
const res3 = {
    status: jest.fn((x) => x),
    json: jest.fn((x) => x),
    // send: {},
}
const res1 = {
    status: jest.fn((x) => x),
    json: jest.fn((x) => x),
    // send: {},
}


const req = {params: {id: '123'}};
const req2 = {params: {id: '665'}};
let req1 ;

describe('POST /create/user', () => {
     
    describe('given a username and password', () => {
        // should save the username and password to the database
        // should specify json in the content type header
        // should respond with a json object containing username
        // should hash the password before sending it to the database

        test("should respond with a status code 200", async () => {
            User.create.mockImplementationOnce(() => (userData))
            await createUser(userData, res)
            expect(res.status).toHaveBeenCalledWith(200);
        })
        test('the passwords are matching', async () => {
            User.create.mockImplementationOnce(() => (userData.password))
            await createUser(userData, res)
            expect(hashed).toHaveBeenCalledWith('123456789')
        })
    })

    describe('when the username and password is missing', () => {
        test('the userData is missing', async () => {
            User.create.mockImplementationOnce(() => (userData1))
            await createUser(userData1, res)
            expect(res.status).toHaveBeenCalledWith(401)
        })
    })

})

describe('GET /get/users', () => {

    test('getting all the users', async () => {
        User.findAll.mockImplementationOnce(() => (users))
        await getAllUsers(users, res)
        expect(res.status).toHaveBeenCalledWith(200)
    })

    test('the response is containing json object', async () => {
        User.findByPk.mockImplementationOnce(() => (userData));
        await getUser(userData, res);
        expect(res.json).toBeDefined()
    })

})
describe(`GET /get/user/:id`, () => {
    test('userId is undefined', async () => {
        User.findByPk.mockImplementationOnce(() => (req1));
        await getUser(req1, res1);
        expect(req1).toBeUndefined()
        // expect(res1.json).toHaveBeenCalledWith({error: 'User id is not defined'})
    
    })

    test('getting a user', async () => {
        User.findByPk.mockImplementationOnce(() => (req))
        await getUser(req, res1)
        expect(res1.status).toHaveBeenCalledWith(200);
        expect(res1.json).toHaveBeenCalledWith(userData)
    })

})

test('if a user is not found', async () => {
    await getUser(req, res1)
    User.findByPk.mockImplementationOnce(() => (null))

    expect(res1.status).toHaveBeenCalledWith(404);
    expect(res1.json).toHaveBeenCalledWith({error:"User is not found"})
})

describe('DELETE /delete/user', () => {
    test('the userid is being receieved',async () => {
        await deleteUser(req, res1)
        User.findByPk.mockImplementationOnce(() => (req))
        expect(req).toBeDefined()
    })

})
test('user is not found',async () => {
    await deleteUser(req, res1)
    User.findByPk.mockImplementationOnce(() => (req1))
    expect(req1).not.toBeDefined()
    expect(res1.status).toHaveBeenCalledWith(404)
})

it('the user is deleted sucessfully', async () => {
    await deleteUser(req, res)
    User.destroy.mockImplementationOnce(() => (req))
    expect(res.status).toHaveBeenCalledWith(200)
    // expect(res3.json).toHaveBeenCalledWith({ message: "User deleted successfully" })
})