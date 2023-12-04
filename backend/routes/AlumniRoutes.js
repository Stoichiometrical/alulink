import express from 'express';
const router = express.Router();
import * as alumniController from '../controllers/AlumniController.js';

// Create a new alumni profile
router.post('/create', alumniController.createAlumni);

// Add many alumni
router.post('/addMany', alumniController.addManyAlumni);

// Get a list of all alumni profiles
router.get('/list', alumniController.getAllAlumni);

//Get alumni by id
router.get('/:id',alumniController.getAlumniById)

// Update an alumni profile by ID
router.put('/:id', alumniController.updateAlumni);

// Delete an alumni profile by ID
router.delete('/:id', alumniController.deleteAlumni);


// Get alumni by name
router.get('/alumni/name/:name', alumniController.getAlumniByName);


// Get alumni by graduation year
router.get('/alumni/graduationYear/:graduationYear', alumniController.getAlumniByGraduationYear);



// Get alumni by degree program
router.get('/alumni/degreeProgram/:degreeProgram', alumniController.getAlumniByDegreeProgram);

//Get total number of alumni
router.get('/alumnicount',alumniController.getTotalAlumniCount)

router.get('/alumnistats/:id',alumniController.getAlumniEventStatistics)

export default router;
