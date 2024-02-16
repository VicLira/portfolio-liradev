const express = require('express');
const router = express.Router();

const ExperienceController = require('../controllers/experienceControllers');

// Get all Experiences
router.get('/', ExperienceController.getAllExperiences);

// Get a experience by type
router.get('/type/', ExperienceController.getExperiencesByType);

//Get a experience by id
router.get('/:id', ExperienceController.findExperienceById);

// Add new Experiences 
router.post('/', ExperienceController.addNewExperience)

//Update a experience by id
router.patch('/:id', ExperienceController.updateAExperience);

//Delete a experience by id
router.delete('/:id', ExperienceController.deleteAExperience);

module.exports = router;
