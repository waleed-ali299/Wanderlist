// server/app.js

const express = require('express');
const dotenv = require('dotenv');
const sequelize = require('./config/database');
const userRoutes = require('./routes/userRoutes'); // Import user routes
const morgan = require('morgan'); // Optional: HTTP request logger middleware

dotenv.config();
const cors = require('cors');
const app = express();

// Enable CORS for all routes and origins
app.use(cors());
// Middleware
app.use(express.json());
app.use(morgan('dev')); // Log HTTP requests (optional)

// Test route
app.get('/', (req, res) => {
  res.send('WanderList API is running...');
});

// Use user routes
app.use('/api/users', userRoutes);

// Error handling middleware (basic example)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Connect to the database and start the server
const startServer = async () => {
  try {
    await sequelize.authenticate(); // Test the database connection
    console.log('Connection to MySQL has been established successfully.');
    await sequelize.sync(); // Sync all models
    console.log('Database & tables synced!');
    const PORT = process.env.PORT || 5004;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Unable to connect to the database:', err);
    process.exit(1); // Exit process with failure
  }
};

startServer();
