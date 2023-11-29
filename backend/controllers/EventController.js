import Event from "../models/Event.js";
import Alumni from "../models/Alumni.js";

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
  
    // Format the date in "Monday DD MMMM YYYY" format
    const formattedEvents = events.map((event) => ({
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


// Get the 4 latest events by category
export const getLatestEventsByCategory = async (req, res, next) => {
  try {
    const { category } = req.params;

    // Find the latest 4 events by category
    const latestEvents = await Event.find({ category })
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



//Get event by title
// export const getEventByTitle = async (req, res, next) => {
//   try {
//     const { title } = req.params;
//     const event = await Event.findOne({ title });

//     if (!event) {
//       return res.status(404).json({ message: "Event not found" });
//     }

//     res.status(200).json(event);
//   } catch (error) {
//     next(error);
//   }
// };


export const getEventByTitle = async (req, res, next) => {
  try {
    const { title } = req.params;
    const event = await Event.findOne({ title });

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Format the date in the desired format
    const formattedDate = new Date(event.date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    // Include the formatted date in the response
    res.status(200).json({ ...event.toObject(), formattedDate });
  } catch (error) {
    next(error);
  }
};

// Join an event (RSVP)
export const joinEvent = async (req, res, next) => {
  try {
    const { eventId } = req.params;
    const { userId } = req.body;

    // Check if the user is already a participant
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    const isParticipant = event.participants.includes(userId);
    if (isParticipant) {
      return res.status(400).json({ message: "User is already a participant" });
    }

    // Add the user to the list of participants
    event.participants.push(userId);
    await event.save();

    

    res.status(200).json({ message: "User joined the event successfully" });
  } catch (error) {
    next(error);
  }
};

// Leave an event (Cancel RSVP)
export const leaveEvent = async (req, res, next) => {
  try {
    const { eventId } = req.params;
    const { userId } = req.body;

    // Check if the user is a participant
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    const participantIndex = event.participants.indexOf(userId);
    if (participantIndex === -1) {
      return res.status(400).json({ message: "User is not a participant" });
    }

    // Remove the user from the list of participants
    event.participants.splice(participantIndex, 1);
    await event.save();

  

    res.status(200).json({ message: "User left the event successfully" });
  } catch (error) {
    next(error);
  }
};

export const getRegisteredEvents = async (req, res, next) => {
  try {
    const { alumniId } = req.params;

    // Find events where the alumni is a participant but not the organizer
    const registeredEvents = await Event.find({
      participants: alumniId,
      organizer: { $ne: alumniId }, // Exclude events organized by the alumni
    });

    // Format the date for each event
    const formattedEvents = registeredEvents.map((event) => ({
      ...event._doc,
      date: new Date(event.date).toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      }),
    }));

    res.status(200).json(formattedEvents);
  } catch (error) {
    next(error);
  }
};

export const getOrganizedEvents = async (req, res, next) => {
  try {
    const { alumniId } = req.params;

    // Find events where the alumni is the organizer
    const organizedEvents = await Event.find({
      organizer: alumniId,
    });

    // Format the date for each event
    const formattedEvents = organizedEvents.map((event) => ({
      ...event._doc,
      date: new Date(event.date).toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      }),
    }));

    res.status(200).json(formattedEvents);
  } catch (error) {
    next(error);
  }
};