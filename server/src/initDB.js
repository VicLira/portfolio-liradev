const mongoose = require('mongoose');

module.exports = () => {
  const mongoUri = process.env.MONGODB_URI; // Prioritize MONGODB_URI

  if (mongoUri) {
    // Use MONGODB_URI directly for production environments
    mongoose
      .connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log('MongoDB connected using MONGODB_URI...');
      })
      .catch(err => console.error('Error connecting:', err.message));
  } else {
    // Use credentials for development or if MONGODB_URI is not available
    const dbName = process.env.MONGO_INITDB_DATABASE;
    const username = process.env.MONGO_INITDB_ROOT_USERNAME;
    const password = process.env.MONGO_INITDB_ROOT_PASSWORD;

    const connectionString = `mongodb://${username}:${password}@localhost:27017/${dbName}?authSource=admin`;

    mongoose
      .connect(connectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log(
          'MongoDB connected using environment credentials...',
          connectionString
        );
      })
      .catch(err => console.error('Error connecting:', err.message));
  }

  // Connection event listeners and SIGINT handler remain the same

  mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to db...');
  });

  mongoose.connection.on('error', err => {
    console.error('Error connecting:', err.message);
  });

  mongoose.connection.on('disconnected', () => {
    console.log('Mongoose connection is disconnected...');
  });

  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      console.log(
        'Mongoose connection is disconnected due to app termination...'
      );
      process.exit(0);
    });
  });
};
