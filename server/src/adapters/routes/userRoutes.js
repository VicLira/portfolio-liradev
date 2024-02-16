const express = require('express');
const router = express.Router();

const UserController = require('../controllers/userControllers');

// Get a list of all users
router.get('/', UserController.getAllUsers);

// Create a new user
router.post('/', UserController.createUser);

// Login user
router.post('/signIn', UserController.authUser);

// Delete user
router.delete('/:id', UserController.deleteAUser);

module.exports = router;
