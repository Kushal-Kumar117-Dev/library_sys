require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();

// const PORT = process.env.PORT || 8083;
const PORT = 8083;
const mongooseURI = process.env.MongodbUrl;
console.log('PORT :', process.env.PORT);
let server;

mongoose.connect(mongooseURI)
    .then(() => {
        console.log('MongoDB connected successfully!');

        server = app.listen(PORT, () => {
            console.log(`App is running on - http://localhost:${PORT}`);
        });
    })
    .catch(err => console.error('MongoDB connection error:', err));


app.get('/', (req, res) => {
    return res.status(200).json({ msg: 'Get API Calls...' });
});

app.post('/users', (req, res) => {
    return res.status(200).json({ msg: 'Post API Calls' });
});

const gracefulShutdown = () => {
    console.log('Shutting down gracefully...');
    if (server) {
        server.close(() => {
            console.log('Server closed.');
            mongoose.connection.close(false, () => {
                console.log('MongoDB connection closed.');
                process.exit(0);
            });
        });
    } else {
        mongoose.connection.close(false, () => {
            console.log('MongoDB connection closed.');
            process.exit(0);
        });
    }
};

process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown); 
