const createError = require('http-errors');
const mongoose = require('mongoose');

const Card = require('../models/cardModels');

module.exports = {
  getAllCards: async (req, res, next) => {
    try {
      const results = await Card.find({}, { __v: 0 });
      res.send(results);
    } catch (error) {
      console.log(error.message);
    }
  },

  createNewCard: async (req, res, next) => {
    try {
      const newCard = new Card(req.body); // Renomeie aqui para newCard
      const result = await newCard.save();
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error.name === 'ValidationError') {
        next(createError(422, error.message));
        return;
      }
      next(error);
    }
  },  

  findCardById: async (req, res, next) => {
    const id = req.params.id;
    try {
      const card = await Card.findById(id);
      if (!card) {
        throw createError(404, 'Card does not exist.');
      }
      res.send(card);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        return next(createError(400, 'Invalid Card id'));
      }
      next(error);
    }
  },

  updateACard: async (req, res, next) => {
    try {
      const id = req.params.id;
      const updates = req.body;
      const options = { new: true };

      const result = await Card.findByIdAndUpdate(id, updates, options);
      if (!result) {
        throw createError(404, 'Card does not exist');
      }
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        return next(createError(400, 'Invalid Card Id'));
      }

      next(error);
    }
  },

  deleteACard: async (req, res, next) => {
    const id = req.params.id;
    try {
      const result = await Card.findByIdAndDelete(id);
      if (!result) {
        throw createError(404, 'Card does not exist.');
      }
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, 'Invalid Card id'));
        return;
      }
      next(error);
    }
  },
}
    /*Or:
  If you want to use the Promise based approach*/
    /*
  const Card = new Card({
    name: req.body.name,
    price: req.body.price
  });
  Card
    .save()
    .then(result => {
      console.log(result);
      res.send(result);
    })
    .catch(err => {
      console.log(err.message);
    }); 
    */