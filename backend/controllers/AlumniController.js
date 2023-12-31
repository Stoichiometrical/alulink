import Alumni from '../models/Alumni.js';

// Create a new alumni profile
export const createAlumni = async (req, res) => {
    try {
        const alumni = new Alumni(req.body);
        const savedAlumni = await alumni.save();
        res.json(savedAlumni);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


// Add many alumni(for testing purposes)
export const addManyAlumni = async (req, res, next) => {
  try {
    // Extract alumni data from the request body
    const alumniData = req.body;

    // Use the create method to insert multiple alumni at once
    const addedAlumni = await Alumni.create(alumniData);

    res.status(201).json({ message: 'Alumni added successfully', alumni: addedAlumni });
  } catch (error) {
    // Pass the error to the next middleware
    next(error);
  }
};

//Get alumni by Id
export const getAlumniById = async (req, res) => {
  try {
      const alumniId = req.params.alumniId;

      if (!mongoose.Types.ObjectId.isValid(alumniId)) {
          return res.status(400).json({ message: 'Invalid alumni ID' });
      }

      const alumni = await Alumni.findById(alumniId);

      if (!alumni) {
          return res.status(404).json({ message: 'Alumni not found' });
      }

      res.json(alumni);
  } catch (error) {
      console.error('Error getting alumni by ID:', error.message);
      res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Get a list of all alumni profiles
export const getAllAlumni = async (req, res) => {
    try {
        const alumni = await Alumni.find();
        res.json(alumni);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update an alumni profile
export const updateAlumni = async (req, res) => {
    try {
        const updatedAlumni = await Alumni.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedAlumni);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete an alumni profile
export const deleteAlumni = async (req, res) => {
    try {
        await Alumni.findByIdAndDelete(req.params.id);
        res.json({ message: 'Alumni profile deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


//get alumni by name
export const getAlumniByName = async (req, res, next) => {
    try {
      const { name } = req.params;
      const alumni = await Alumni.findOne({ fullName: name });
  
      if (!alumni) {
        return res.status(404).json({ message: "Alumni not found" });
      }
  
      res.status(200).json(alumni);
    } catch (error) {
      next(error);
    }
  };

//get alumni by graduation year
export const getAlumniByGraduationYear = async (req, res, next) => {
    try {
      const { graduationYear } = req.params;
      const alumni = await Alumni.find({ graduationYear });
  
      if (!alumni || alumni.length === 0) {
        return res.status(404).json({ message: "Alumni not found" });
      }
  
      res.status(200).json(alumni);
    } catch (error) {
      next(error);
    }
  };


//Get alumni by degree program
export const getAlumniByDegreeProgram = async (req, res, next) => {
    try {
      const { degreeProgram } = req.params;
      const alumni = await Alumni.find({ degreeProgram });
  
      if (!alumni || alumni.length === 0) {
        return res.status(404).json({ message: "Alumni not found" });
      }
  
      res.status(200).json(alumni);
    } catch (error) {
      next(error);
    }
  };  




//Get total number of alumni
export const getTotalAlumniCount = async (req, res) => {
  try {
    const count = await Alumni.countDocuments();
    res.json({ totalAlumni: count });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getAlumniEventStatistics = async (req, res) => {
  const alumniId = req.params.alumniId;

  try {
    // Get the number of events organized by the alumni
    const eventsOrganizedCount = await Event.countDocuments({ organizer: alumniId });

    // Get the number of events registered by the alumni
    const alumni = await Alumni.findById(alumniId);

    if (!alumni) {
      return res.status(404).json({ error: 'Alumni not found' });
    }

    const eventsRegisteredCount = alumni.eventsOrganized.length;

    res.json({
      eventsOrganizedCount,
      eventsRegisteredCount,
    });
  } catch (error) {
    console.error('Error fetching alumni event statistics:', error);
    res.status(500).json({ error: 'Internal Server Error. Please try again later.' });
  }
};
