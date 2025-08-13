var express = require("express")
var app = express()
const mongoose = require('mongoose');
// Routes
const dogsRoute = require('./routes/dogs');
const contactsRoute = require('./routes/contacts');
const seedRoute = require('./routes/seed');

// Middleware
app.use(express.static(__dirname + '/public'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/dogAdoptionDB');

mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
    console.log('MongoDB connection error:', err);
});

// Mount routes (Routes -> Controllers -> Services -> Models)
app.use('/api/dogs', dogsRoute);
app.use('/api/contacts', contactsRoute);
// Backward-compatible alias for POST /api/contact
app.post('/api/contact', require('./controllers').contactController.createContact);
// Seed route
app.use('/api/seed', seedRoute);

var port = process.env.port || 3000;

app.listen(port, () => {
    console.log("App listening to: " + port)
})