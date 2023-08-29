const asyncHandler = require('express-async-handler')

const User = require('../models/userModel')
const Ticket = require('../models/ticketModel')
const Note = require('../models/noteModel')

// @desc    get notes for a ticket
// @route   GET /api/tickets/:ticketId/notes
// @access  Private
const getNotes = asyncHandler(async (req, res) => {
  //get req.user from jwt by protect()
  //get user by id
  const user = await User.findById(req.user.id)
  if (!user) {
    res.status(401)
    throw new Error('User not found')
  }

  //get ticket
  const ticket = await Ticket.findById(req.params.ticketId)
  if (ticket.user.toString() !== req.user.id) {
    res.status(401)
    throw newError('User not authorized')
  }

  const notes = await Note.find({ ticket: req.params.ticketId })

  res.status(200).json(notes)
})

// @desc    create a note for a ticket
// @route   POST /api/tickets/:ticketId/notes
// @access  Private
const addNote = asyncHandler(async (req, res) => {
  //get req.user from jwt by protect()
  //get user by id
  const user = await User.findById(req.user.id)
  if (!user) {
    res.status(401)
    throw new Error('User not found')
  }

  //get ticket
  const ticket = await Ticket.findById(req.params.ticketId)
  if (ticket.user.toString() !== req.user.id) {
    res.status(401)
    throw newError('User not authorized')
  }

  //create a note
  const note = await Note.create({
    text: req.body.text,
    isStaff: false,
    user: req.user.id,
    ticket: req.params.ticketId,
  })

  res.status(201).json(note)
})

module.exports = {
  getNotes,
  addNote,
}
