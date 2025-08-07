const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/dogAdoptionDB');

mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB for seeding');
});

// Define Dog schema and model (same as in server.js)
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

// Sample dog data for seeding
const sampleDogs = [
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
    },
    {
        title: "Border Collie",
        image: "images/border-collie.jpeg",
        link: "Learn More",
        description: "Border Collies are athletic, medium-sized herders standing 18 to 22 inches at the shoulder. They are known for their intense stare, or 'eye,' with which they control their flock.",
        breed: "Border Collie",
        age: "3 years old",
        weight: "45 lbs",
        temperament: "Smart, Work-Oriented, Energetic"
    }
];

// Function to seed the database
const seedDatabase = async () => {
    try {
        // Clear existing data
        await Dog.deleteMany({});
        console.log('Cleared existing dog data');

        // Insert new data
        const insertedDogs = await Dog.insertMany(sampleDogs);
        console.log(`Successfully seeded database with ${insertedDogs.length} dogs:`);

        insertedDogs.forEach(dog => {
            console.log(`- ${dog.title} (${dog.breed})`);
        });

        console.log('Database seeding completed!');
        process.exit(0);

    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

// Run the seeding function
seedDatabase();
