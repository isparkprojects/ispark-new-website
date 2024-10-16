// Import required packages
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');  // For password hashing
const jwt = require('jsonwebtoken'); // For JWT token generation
const User = require('./models/User');

// Load environment variables from .env file
dotenv.config();

// Initialize express app
const app = express();
// Serve static files (HTML, CSS, JS, etc.)
app.use(express.static('C:/Users/admin/ispark-new-website')); // Add this line
// Middleware
app.use(cors()); // Enable CORS
app.use(bodyParser.json()); // Parse JSON requests

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected!'))
    .catch(err => console.error('MongoDB connection error:', err));

// Middleware to verify JWT
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Extract token from Bearer header

    if (!token) {
        return res.status(401).json({ message: 'No token provided. Access denied.' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token. Access denied.' });
        }
        req.user = user; // Attach user info to request object
        next();
    });
}

// User signup route
app.post('/api/signup', async (req, res) => {
    const { name, email, password } = req.body;

    // Basic validation
    if (!name || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save(); // Save the user in the database

        // Create and sign a JWT token
        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        return res.status(201).json({ message: 'User registered successfully', token });
    } catch (err) {
        return res.status(500).json({ message: 'Error registering user', error: err.message });
    }
});

// User login route
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    // Basic validation
    if (!email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Compare the entered password with the hashed password in the database
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Create and sign a JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // If login is successful
        return res.status(200).json({ message: 'Login successful', token });
    } catch (err) {
        return res.status(500).json({ message: 'Error logging in', error: err.message });
    }
});

// Protected dashboard route
app.get('/api/dashboard', authenticateToken, async (req, res) => {
    try {
        // Find the user in the database
        const user = await User.findById(req.user.userId).select('-password'); // Exclude password field
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Send back user details to the dashboard
        res.status(200).json({
            message: 'Welcome to your dashboard',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                // Add more user fields if needed
            }
        });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
