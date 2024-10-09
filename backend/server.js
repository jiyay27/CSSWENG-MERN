require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const workoutRoutes = require('./routes/workouts.js');
const loginRoutes = require('./routes/login.js'); // Import login route

// express app
const app = express();

// middleware
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    console.log(`Received request: ${req.method} ${req.path}`);
    next();
});

// routes
app.use('/api/workouts', workoutRoutes);
app.use('/api/login', loginRoutes);  // Add the login route

// connect to MongoDB using the connection string in .env
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
      console.log('Connected to local MongoDB');
  })
  .catch(err => {
      console.log('Database connection error:', err);
  });

// start the server
app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
