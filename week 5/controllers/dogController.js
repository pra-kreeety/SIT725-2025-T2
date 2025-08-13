const dogService = require('../services/dogService');

// GET /api/dogs
exports.getDogs = async (req, res) => {
    try {
        const dogs = await dogService.getAll();
        res.json({ statusCode: 200, data: dogs, message: 'Success' });
    } catch (error) {
        res.json({ statusCode: 500, data: [], message: 'Error retrieving dogs: ' + error.message });
    }
};

// GET /api/seed
exports.seedDogs = async (req, res) => {
    try {
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

        await dogService.clearAll();
        const insertedDogs = await dogService.insertMany(cardList);
        res.json({ statusCode: 200, data: insertedDogs, message: 'Database seeded successfully with ' + insertedDogs.length + ' dogs' });
    } catch (error) {
        res.json({ statusCode: 500, data: [], message: 'Error seeding database: ' + error.message });
    }
};
