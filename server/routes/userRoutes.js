const path = require('path');
const express = require('express');
const { registerUser, loginUser, getUserDetails, uploadProfilePhoto } = require('../controllers/userController');
const authenticateToken = require('../middleware/authenticateToken'); // Import the middleware
const multer = require('multer');
const router = express.Router();

// Configure multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Adjust the path to the uploads directory relative to the server directory
    cb(null, path.join(__dirname, 'server/uploads')); // Adjust this path accordingly
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Append a timestamp to avoid conflicts
  }
});

const upload = multer({ storage: storage });

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', authenticateToken, getUserDetails); // Apply the middleware here
router.post('/upload-photo', authenticateToken, upload.single('profilePhoto'), uploadProfilePhoto);

module.exports = router;
