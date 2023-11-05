const express = require('express');
const router = express.Router();
const alumniController = require('../controllers/AlumniController');

// Create a new alumni profile
router.post('/create', alumniController.createAlumni);

// Get a list of all alumni profiles
router.get('/list', alumniController.getAllAlumni);

// Update an alumni profile by ID
router.put('/:id', alumniController.updateAlumni);

// Delete an alumni profile by ID
router.delete('/:id', alumniController.deleteAlumni);

module.exports = router;
