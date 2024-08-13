const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const path = require('path');
const { JWT_SECRET } = process.env;

// Register a new user
const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        // Optionally include other fields
      }
    });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate token
    const token = jwt.sign(
      { id: user.id, username: user.username, email: user.email },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        // Optionally include other fields
      }
    });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get user details
const getUserDetails = async (req, res) => {
  try {
    const userId = req.user.id;
    if (!userId) return res.sendStatus(401);

    // Fetch user details
    const user = await User.findByPk(userId, {
      attributes: ['username', 'email', 'created_at'], // Ensure these fields are included
    });
    
    if (!user) return res.sendStatus(404);

    res.json(user); // Send user details as JSON
  } catch (error) {
    console.error('Error fetching user details:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Upload profile photo
const uploadProfilePhoto = async (req, res) => {
  if (!req.file) {
    console.error('No file uploaded.');
    return res.status(400).send('No file uploaded.');
  }

  const filePath = path.join(__dirname, '../uploads', req.file.filename);
  const fileUrl = `http://localhost:5004/uploads/${req.file.filename}`;

  try {
    // Update user profile photo URL in the database
    const [updated] = await User.update(
      { profilePhotoUrl: fileUrl },
      { where: { id: req.user.id } }
    );

    if (updated) {
      res.status(200).send('Profile photo updated successfully.');
    } else {
      res.status(404).send('User not found.');
    }
  } catch (error) {
    console.error('Error updating profile photo URL in database:', error);
    res.status(500).send('Error updating profile photo.');
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserDetails,
  uploadProfilePhoto
};
