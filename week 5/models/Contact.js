const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    message: String,
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Contact', ContactSchema);
