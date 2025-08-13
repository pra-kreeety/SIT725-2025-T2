const Dog = require('../models/Dog');

const getAll = async () => Dog.find({});
const insertMany = async (dogs) => Dog.insertMany(dogs);
const clearAll = async () => Dog.deleteMany({});

module.exports = { getAll, insertMany, clearAll };
