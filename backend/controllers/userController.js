//handle promise (by mongoose) easier
const asyncHandle = require('express-async-handler')

//hash password
const bcrypt = require('bcryptjs')

const User = require('../models/userModel')

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

  //find if user already exists
  const userExists = await User.findOne({ email })
  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  //hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  //creat user with req
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  })
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    })
  } else {
    res.status(400)
    throw new error('Incalid user data')
  }
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
