const express = require('express');
const dotenv = require('dotenv');
const sequelize = require('./config/database');
const userRoutes = require('./routes/userRoutes'); // Import user routes
const morgan = require('morgan'); // Optional: HTTP request logger middleware
const path = require('path'); // To handle file paths
const cors = require('cors');
const { Continent, Country, User, UserWishlist } = require('./models'); // Import models and sequelize instance

dotenv.config();
const app = express();

// Enable CORS for all routes and origins
app.use(cors());

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(morgan('dev')); // Log HTTP requests (optional)

// Static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve static files from 'uploads' directory

// Routes
const travelRoutes = require('./routes/travelRoutes'); // Adjust path as needed

app.get('/', (req, res) => {
  res.send('WanderList API is running...');
});

// Use routes
app.use('/api/users', userRoutes);
app.use('/api', travelRoutes); // Prefix for all routes in travelRoutes

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

    // Sync models and associations
    await sequelize.sync({ alter: true }); // Alter tables to match models
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
