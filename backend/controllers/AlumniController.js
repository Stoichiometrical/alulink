const Alumni = require('../models/Alumni');

// Create a new alumni profile
exports.createAlumni = async (req, res) => {
    try {
        const alumni = new Alumni(req.body);
        const savedAlumni = await alumni.save();
        res.json(savedAlumni);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get a list of all alumni profiles
exports.getAllAlumni = async (req, res) => {
    try {
        const alumni = await Alumni.find();
        res.json(alumni);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update an alumni profile
exports.updateAlumni = async (req, res) => {
    try {
        const updatedAlumni = await Alumni.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedAlumni);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete an alumni profile
exports.deleteAlumni = async (req, res) => {
    try {
        await Alumni.findByIdAndDelete(req.params.id);
        res.json({ message: 'Alumni profile deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
