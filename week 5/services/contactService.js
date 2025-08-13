const Contact = require('../models/Contact');

const create = async (payload) => {
    const contact = new Contact(payload);
    return contact.save();
};

const getAll = async () => Contact.find({}).sort({ timestamp: -1 });

module.exports = { create, getAll };
