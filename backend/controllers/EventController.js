const Event = require('../models/Event');

// Create a new event
exports.createEvent = async (req, res) => {
    try {
        const event = new Event(req.body);
        const savedEvent = await event.save();
        res.json(savedEvent);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get a list of all events
exports.getAllEvents = async (req, res) => {
    try {
        const events = await Event.find();
        res.json(events);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update an event
// exports.updateEvent = async (req, res) => {
//     try {
//         const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
//         res.json(updatedEvent);
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// };

exports.updateEvent = async (req, res) => {
    try {
        // Fetch the existing event
        const existingEvent = await Event.findById(req.params.id);

        if (!existingEvent) {
            return res.status(404).json({ error: 'Event not found' });
        }

        // Perform validation or any necessary checks on req.body data
        // For example, you can ensure that the user is allowed to update the event.

        // Update the event fields
        existingEvent.title = req.body.title || existingEvent.title;
        existingEvent.description = req.body.description || existingEvent.description;
        existingEvent.category = req.body.category || existingEvent.category;
        existingEvent.date = req.body.date || existingEvent.date;

        // Save the updated event
        const updatedEvent = await existingEvent.save();

        res.json(updatedEvent);
    } catch (error) {
        // Handle different types of errors
        res.status(500).json({ error: error.message });
    }
};


// Delete an event
exports.deleteEvent = async (req, res) => {
    try {
        await Event.findByIdAndDelete(req.params.id);
        res.json({ message: 'Event deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
        console.log('Event not deleted')
    }
};


exports.createManyEvents = async (req, res) => {
    try {
        const events = req.body; // Assuming the request body is an array of event objects
        const savedEvents = await Event.insertMany(events);
        res.json(savedEvents);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
