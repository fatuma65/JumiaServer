
const router = require('express').Router()
const { createUser, getAllUsers, updateUser, getUser, deleteUser } = require('../controllers/userController')
const { loginUser } = require('./loginUser')


router.post('/create/user', createUser)
router.get('/get/users', getAllUsers)
router.put('/update/user/:id', updateUser)
router.get('/get/user/:id', getUser)
router.delete('/delete/user/:id', deleteUser)

router.post('/login/user', loginUser)

module.exports = router