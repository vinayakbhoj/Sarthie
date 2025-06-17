const env = require('dotenv');
env.config();
const express = require('express');
const app = express();
const connectToDB = require('./db/db'); // Import the database connection function
const userRoutes = require('./routes/user.routes'); // Import user routes
const cookieParser = require('cookie-parser'); // Import cookie parser middleware

// Connect to the database
connectToDB(); // Call the function to connect to the database

app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies
app.use(cookieParser()); // Middleware to parse cookies

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/users', userRoutes); // Use user routes under the /users path



module.exports = app; // Export the app for testing purposes