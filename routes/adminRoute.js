const router = require('express').Router()
const {createAdmin, loginAdmin} = require('../controllers/AdminController')

router.post('/create/admin', createAdmin)
router.post('/login/admin', loginAdmin)

module.exports = router