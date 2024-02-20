const express = require('express');
const cors = require('cors')
const createError = require('http-errors');
const dotenv = require('dotenv').config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: [ 'http://localhost:3000', 
            'https://liradev-portfolio.netlify.app' 
          ] // Permitir apenas solicitações do localhost:3000
}));

// Initialize DB
require('./initDB')();

const CardRouter = require('./adapters/routes/cardRoutes');
const ExperienceRouter = require('./adapters/routes/experienceRoutes');
const UserRouter = require('./adapters/routes/userRoutes');

app.use('/cards', CardRouter);
app.use('/experiences', ExperienceRouter);
app.use('/users', UserRouter);

//404 handler and pass to error handler
app.use((req, res, next) => {
  /*
  const err = new Error('Not found');
  err.status = 404;
  next(err);
  */
  // You can use the above code if your not using the http-errors module
  next(createError(404, 'Not found'));
});

//Error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message
    }
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log('Server started on port ' + PORT + '...');
});