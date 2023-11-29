import express from 'express';
const router = express.Router();
import * as eventController from '../controllers/EventController.js';

// Create a new event
router.post('/add', eventController.createEvent);

router.post('/addmany', eventController.createManyEvents);

// Get a list of all events
router.get('/events', eventController.getAllEvents);

// Update an event by ID
router.put('/:id', eventController.updateEvent);

// Delete an event by ID
router.delete('/:id', eventController.deleteEvent);


//Get latest events
router.get('/latest', eventController.getLatestEvents);

// Get events by category
router.get('/events/category/:category', eventController.getEventsByCategory);

// Get events by user ID
router.get('/events/user/:userId', eventController.getEventsByUserId);

// Get the first 4 events
router.get('/events/firstfour', eventController.getFirstFourEvents);

// Get the 4 latest events by category
router.get('/events/latest/:category', eventController.getLatestEventsByCategory); 

// Get events by date range
router.get('/events/date/:startDate/:endDate', eventController.getEventsByDate);

// Get event by title
router.get('/events/title/:title', eventController.getEventByTitle);

// Route to join an event (RSVP)
router.post('/join/:eventId', eventController.joinEvent);

// Route to leave an event (Cancel RSVP)
router.post('/leave/:eventId', eventController.leaveEvent);


//Route to get events registered
router.get("/events/registered/:alumniId", eventController.getRegisteredEvents);

//Route to get events organized
router.get("/events/organized/:alumniId", eventController.getOrganizedEvents);

export default router;
