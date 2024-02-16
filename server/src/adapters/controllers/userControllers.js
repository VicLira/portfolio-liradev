const createError = require('http-errors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const User = require('../models/userModels');

function generateAuthToken(user) {
  // Aqui, você pode definir as informações que deseja incluir no token
  const payload = {
      userId: user._id,
      email: user.email,
      // Outros campos relevantes podem ser adicionados aqui
  };

  // Gere o token com uma chave secreta. A chave secreta deve ser mantida em um ambiente seguro.
  const token = jwt.sign(payload, '51>c-j,XAo1Q<>?Oa0', { expiresIn: '1h' }); // Token expira em 1 hora

  return token;
}

function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

module.exports = {
  getAllUsers: async (req, res, next) => {
    try {
      const results = await User.find({}, { __v: 0 });
      res.send(results);
    } catch (error) {
      console.log(error.message);
    }
  }, 

  createUser: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const newUser = new User({ email, password });
      newUser.hashPassword(password); // Chama a função hashPassword para gerar o hash da senha
      const result = await newUser.save();
      res.status(201).send(result);
    } catch (error) {
      next(error);
    }
  },
  
  authUser: async (req, res, next) => {
    try {
      const { email, password } = req.body;
  
      if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
      }
  
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      const isMatch = user.comparePassword(password);
  
      if (!isMatch) {
        return res.status(401).json({ error: 'Invalid password' });
      }
  
      const token = generateAuthToken(user);
  
      res.status(200).json({ token });
    } catch (error) {
      next(error);
    }
  },

  deleteAUser: async (req, res, next) => {
    const id = req.params.id;
    try {
      const result = await User.findByIdAndDelete(id);
      if (!result) {
        throw createError(404, 'User does not exist.');
      }
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, 'Invalid User id'));
        return;
      }
      next(error);
    }
  }
}
  