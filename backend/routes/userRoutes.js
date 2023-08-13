const express = require('express')
const router = express.Router()
//functions import from userController.js
const {
  registerUser,
  loginUser,
  getMe,
} = require('../controllers/userController')

const { protect } = require('../middleware/authMiddleware')

router.post('/', registerUser)

router.post('/login', loginUser)

router.get('/me', protect, getMe)

//export router
module.exports = router
