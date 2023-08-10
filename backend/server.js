//import express
const express = require('express')

//import .env
const dotenv = require('dotenv').config()

//find port in .env
const PORT = process.env.PORT || 8000

const app = express()

//create route

//root url
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to the Support Desk API' })
})

//route
///POST api/users/... matches the url in userRoute.js
app.use('/api/users', require('./routes/userRoutes'))

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
