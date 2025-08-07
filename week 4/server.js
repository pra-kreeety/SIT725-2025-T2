var express = require("express")
var app = express()
const mongoose = require('mongoose');

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

// Define Dog schema and model
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

const Dog = mongoose.model('Dog', DogSchema);

// Define Contact schema and model
const ContactSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    message: String,
    timestamp: { type: Date, default: Date.now }
});

const Contact = mongoose.model('Contact', ContactSchema);

// Static data for seeding (keeping your original dog data)
const cardList = [
    {
        title: "Golden Retriever",
        image: "images/dog-2.png",
        link: "Learn More",
        description: "Golden Retrievers are friendly, intelligent, and devoted dogs. They make excellent family pets and are known for their gentle temperament and love of water.",
        breed: "Golden Retriever",
        age: "2 years old",
        weight: "65 lbs",
        temperament: "Friendly, Intelligent, Devoted"
    },
    {
        title: "German Shepherd",
        image: "images/dog-3.jpeg",
        link: "Learn More",
        description: "German Shepherds are courageous, confident, and smart working dogs. They are extremely versatile, serving as family companions, guard dogs, and in many service roles.",
        breed: "German Shepherd",
        age: "3 years old",
        weight: "75 lbs",
        temperament: "Confident, Courageous, Smart"
    },
    {
        title: "Labrador Retriever",
        image: "images/dog-1.jpg",
        link: "Learn More",
        description: "Labrador Retrievers are outgoing, active dogs who have more than enough affection to go around for a family looking for a medium-to-large dog. They are famously friendly and make excellent companions.",
        breed: "Labrador Retriever",
        age: "4 years old",
        weight: "70 lbs",
        temperament: "Outgoing, Active, Friendly"
    }
];

// REST API route to get dogs from database
app.get('/api/dogs', async (req, res) => {
    try {
        const dogs = await Dog.find({});
        res.json({ statusCode: 200, data: dogs, message: 'Success' });
    } catch (error) {
        res.json({ statusCode: 500, data: [], message: 'Error retrieving dogs: ' + error.message });
    }
});

// REST API route to save contact information
app.post('/api/contact', async (req, res) => {
    try {
        const { firstName, lastName, email, phone, message } = req.body;

        // Basic validation
        if (!firstName || !lastName || !email || !message) {
            return res.json({
                statusCode: 400,
                message: 'Please provide all required fields (firstName, lastName, email, message)'
            });
        }

        // Create new contact
        const newContact = new Contact({
            firstName,
            lastName,
            email,
            phone,
            message
        });

        // Save to database
        const savedContact = await newContact.save();

        res.json({
            statusCode: 200,
            data: savedContact,
            message: 'Contact information saved successfully'
        });

    } catch (error) {
        res.json({
            statusCode: 500,
            message: 'Error saving contact information: ' + error.message
        });
    }
});

// REST API route to get all contacts (for admin purposes)
app.get('/api/contacts', async (req, res) => {
    try {
        const contacts = await Contact.find({}).sort({ timestamp: -1 });
        res.json({ statusCode: 200, data: contacts, message: 'Success' });
    } catch (error) {
        res.json({ statusCode: 500, data: [], message: 'Error retrieving contacts: ' + error.message });
    }
});

// Route to seed the database (for initial setup)
app.get('/api/seed', async (req, res) => {
    try {
        // Clear existing data
        await Dog.deleteMany({});

        // Insert seed data
        const insertedDogs = await Dog.insertMany(cardList);
        res.json({
            statusCode: 200,
            data: insertedDogs,
            message: 'Database seeded successfully with ' + insertedDogs.length + ' dogs'
        });
    } catch (error) {
        res.json({ statusCode: 500, data: [], message: 'Error seeding database: ' + error.message });
    }
});

var port = process.env.port || 3000;

app.listen(port, () => {
    console.log("App listening to: " + port)
})