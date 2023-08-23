//import express
const express = require('express')
const colors = require('colors')
//import .env
const dotenv = require('dotenv').config()
const { errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
//find port in .env
const PORT = process.env.PORT || 8000

//connect to DB
connectDB()

const app = express()

//add middleware
//allow sending route json
app.use(express.json())
//allow url encoded form
app.use(express.urlencoded({ extend: false }))

//create route
//root url
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to the Support Desk API' })
})

//route
//api/users/... matches the url (with its HTTP method) in userRoute.js
app.use('/api/users', require('./routes/userRoutes'))

app.use('/api/tickets', require('./routes/ticketRoutes'))

app.use(errorHandler)

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
