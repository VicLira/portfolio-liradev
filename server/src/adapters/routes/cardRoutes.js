const express = require('express');
const router = express.Router();

const CardController = require('../controllers/cardControllers');

//Get a list of all cards
router.get('/', CardController.getAllCards);

//Create a new card
router.post('/', CardController.createNewCard);

//Get a card by id
router.get('/:id', CardController.findCardById);

//Update a card by id
router.patch('/:id', CardController.updateACard);

//Delete a card by id
router.delete('/:id', CardController.deleteACard);

module.exports = router;