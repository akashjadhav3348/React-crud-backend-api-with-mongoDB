const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');  // Import cors middleware
const User = require('./User');  // Your User model

const app = express();

// Enable CORS for all origins
app.use(cors());

// Middleware for parsing JSON
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/local')
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log('Error connecting to MongoDB:', err));

// POST endpoint to save a new user
app.post('/api/users', async (req, res) => {
  const { name, email, password, uploadImg } = req.body;

  try {
    const newUser = new User({ name, email, password, uploadImg });
    await newUser.save();
    res.status(201).json({ message: 'User created', user: newUser });
  } catch (err) {
    res.status(500).json({ message: 'Error creating user', error: err.message });
  }
});

// GET endpoint to retrieve all users
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();  // Fetch all users from the database
    res.status(200).json(users);      // Send the list of users as a response
  } catch (err) {
    res.status(500).json({ message: 'Error fetching users', error: err.message });
  }
});

// DELETE endpoint to delete a user by ID
app.delete('/api/users/:id', async (req, res) => {
  const userId = req.params.id;  // Get the user ID from the request parameters

  try {
    const deletedUser = await User.findByIdAndDelete(userId);  // Find the user by ID and delete
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted', user: deletedUser });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting user', error: err.message });
  }
});

// PUT endpoint to update a user by ID
app.put('/api/users/:id', async (req, res) => {
  const userId = req.params.id;  // Get the user ID from the request parameters
  const { name, email, password, uploadImg } = req.body;  // Destructure the updated user data from the request body

  try {
    const updatedUser = await User.findByIdAndUpdate(userId, { name, email, password, uploadImg }, { new: true });  // Update the user and return the updated document
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User updated', user: updatedUser });  // Send the updated user as a response
  } catch (err) {
    res.status(500).json({ message: 'Error updating user', error: err.message });
  }
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
