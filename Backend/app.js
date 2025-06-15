const env = require('dotenv');
env.config();
const express = require('express');
const app = express();

const mongoose = require('mongoose');



const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/sarthie';

main().then(() => {
    console.log('Connected to db');
}).catch(err => {
    console.log(err);
    
});

async function main() {
    await mongoose.connect(MONGO_URL);
};

app.get('/', (req, res) => {
    res.send('Hello World!');
});



module.exports = app; // Export the app for testing purposes