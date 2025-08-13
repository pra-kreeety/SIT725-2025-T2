const mongoose = require('mongoose');

const DogSchema = new mongoose.Schema({
    title: String,
    image: String,
    link: String,
    description: String,
    breed: String,
    age: String,
    weight: String,
    temperament: String
});

module.exports = mongoose.model('Dog', DogSchema);
