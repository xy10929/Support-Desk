const express = require('express')
const router = express.Router()
//functions import from userController.js
const { registerUser, loginUser } = require('../controllers/userController')

router.post('/', registerUser)

router.post('/login', loginUser)

//export router
module.exports = router
