const express = require('express');
const router = express.Router();
const eventController = require('../controllers/EventController');

// Create a new event
router.post('/add', eventController.createEvent);

router.post('/addmany', eventController.createManyEvents);

// Get a list of all events
router.get('/events', eventController.getAllEvents);

// Update an event by ID
router.put('/:id', eventController.updateEvent);

// Delete an event by ID
router.delete('/:id', eventController.deleteEvent);

module.exports = router;
