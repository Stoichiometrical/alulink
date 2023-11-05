const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const eventRoutes = require("./routes/EventRoutes")
const alumniRoutes = require("./routes/AlumniRoutes")

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB URI
const uri = "mongodb+srv://davidtgondo:12345@cluster0.rjvgpf1.mongodb.net/?retryWrites=true&w=majority";

// Async function to set up the database connection
async function connectToDatabase() {
    try {
        // Connect to your MongoDB database
        await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

        const db = mongoose.connection;

        // Event handling for successful connection
        db.on('connected', () => {
            console.log('Database connection successful');
        });

        // Event handling for database disconnection
        db.on('disconnected', () => {
            console.log('Database disconnected');
        });

        // Event handling for database connection error
        db.on('error', (err) => {
            console.error('Database connection error:', err);
        });
    } catch (error) {
        console.error('Error connecting to the database:', error);
    }
}

// Middleware
app.use(cors());
app.use(bodyParser.json());

app.use('/event',eventRoutes)
app.use('/alumni',alumniRoutes)

// Start the server
async function startServer() {
    await connectToDatabase();
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

// Call the async function to start the server
startServer();
