const createError = require('http-errors');
const mongoose = require('mongoose');

const Experience = require('../models/experienceModels');

module.exports = {
  getAllExperiences: async (req, res, next) => {
    try {
      const results = await Experience.find({}, { __v: 0 });
      res.send(results);
    } catch (error) {
      console.log(error.message);
    }
  },

  findExperienceById: async (req, res, next) => {
    const id = req.params.id;
    try {
      const experience = await Experience.findById(id);
      if (!experience) {
        throw createError(404, 'Experience does not exist.');
      }
      res.send(experience);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        return next(createError(400, 'Invalid Experience id'));
      }
      next(error);
    }
  },

  getExperiencesByType: async (req, res) => {
    try {
      const type = req.query.type;
  
      // Busca as experiências com o tipo especificado
      const experiences = await Experience.find({ type: type });
  
      res.json(experiences);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao buscar experiências' });
    }
  },
  
  addNewExperience: async (req, res, next) => {
    try {
      const newExperience = new Experience(req.body);
      const result = await newExperience.save();
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

  updateAExperience: async (req, res, next) => {
    try {
      const id = req.params.id;
      const updates = req.body;
      const options = { new: true };

      const result = await Experience.findByIdAndUpdate(id, updates, options);
      if (!result) {
        throw createError(404, 'Experience does not exist');
      }
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        return next(createError(400, 'Invalid Experience Id'));
      }

      next(error);
    }
  },

  deleteAExperience: async (req, res, next) => {
    const id = req.params.id;
    try {
      const result = await Experience.findByIdAndDelete(id);
      if (!result) {
        throw createError(404, 'Experience does not exist.');
      }
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, 'Invalid Experience id'));
        return;
      }
      next(error);
    }
  },
}