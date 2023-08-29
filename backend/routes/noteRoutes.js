const express = require('express')
//each note belongs to a ticket
const router = express.Router({ mergeParams: true })
const { protect } = require('../middleware/authMiddleware')

const { getNotes, addNote } = require('../controllers/noteController')

router.route('/').get(protect, getNotes).post(protect, addNote)

module.exports = router
