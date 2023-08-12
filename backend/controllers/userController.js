//handle promise (by mongoose) easier
const asyncHandle = require('express-async-handler')

// @desc    Register a new user
// @route   /api/users
// @access  Public
const registerUser = asyncHandle(async (req, res) => {
  const { name, email, password } = req.body

  //validation
  if (!name || !email || !password) {
    res.status(400)
    throw new Error('Please include all fields')
  }

  res.send('Register Route')
})

// @desc    Login a user
// @route   /api/users/login
// @access  Public
const loginUser = asyncHandle(async (req, res) => {
  res.send('Login Route')
})

module.exports = {
  registerUser,
  loginUser,
}
