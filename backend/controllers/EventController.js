import Event from "../models/Event.js";

// Create a new event
export const createEvent = async (req, res) => {
  try {
    const event = new Event(req.body);
    const savedEvent = await event.save();
    res.json(savedEvent);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a list of all events
export const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update an event
export const updateEvent = async (req, res) => {
  try {
    // Fetch the existing event
    const existingEvent = await Event.findById(req.params.id);

    if (!existingEvent) {
      return res.status(404).json({ error: "Event not found" });
    }

    // Perform validation or any necessary checks on req.body data
    // For example, you can ensure that the user is allowed to update the event.

    // Update the event fields
    existingEvent.title = req.body.title || existingEvent.title;
    existingEvent.description =
      req.body.description || existingEvent.description;
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
export const deleteEvent = async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.log("Event not deleted");
  }
};

// Create multiple events
export const createManyEvents = async (req, res) => {
  try {
    const events = req.body; // Assuming the request body is an array of event objects
    const savedEvents = await Event.insertMany(events);
    res.json(savedEvents);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Get events by userId
export const getEventsByUserId = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const events = await Event.find({ organizer: userId });
    res.status(200).json(events);
  } catch (error) {
    next(error);
  }
};

//Get first 4 events
export const getFirstFourEvents = async (req, res, next) => {
  try {
    const events = await Event.find().limit(4);
    res.status(200).json(events);
  } catch (error) {
    next(error);
  }
};

//get events by date
export const getEventsByDate = async (req, res, next) => {
  try {
    const { startDate, endDate } = req.params;
    const events = await Event.find({
      date: { $gte: startDate, $lte: endDate },
    });
    res.status(200).json(events);
  } catch (error) {
    next(error);
  }
};

// Get the 4 latest events
export const getLatestEvents = async (req, res, next) => {
  try {
    const latestEvents = await Event.find()
      .sort({ date: -1 }) // Sort events in descending order based on date
      .limit(4); // Limit the result to 4 events

    // Format the date in "Monday DD MMMM YYYY" format
    const formattedEvents = latestEvents.map((event) => ({
      ...event.toJSON(),
      date: event.date.toLocaleDateString("en-US", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
      time: event.date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    }));

    res.status(200).json(formattedEvents);
  } catch (error) {
    next(error);
  }
};

//Get events by category
export const getEventsByCategory = async (req, res, next) => {
  try {
    const { category } = req.params;
    const events = await Event.find({ category });

    // Format date for each event
    const formattedEvents = events.map((event) => ({
      ...event._doc,
      date: new Date(event.date).toLocaleDateString("en-US", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    }));

    res.status(200).json(formattedEvents);
  } catch (error) {
    next(error);
  }
};

//Get event by tititle
export const getEventByTitle = async (req, res, next) => {
  try {
    const { title } = req.params;
    const event = await Event.findOne({ title });

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json(event);
  } catch (error) {
    next(error);
  }
};
