const contactService = require('../services/contactService');

// POST /api/contact
exports.createContact = async (req, res) => {
    try {
        const { firstName, lastName, email, phone, message } = req.body;

        if (!firstName || !lastName || !email || !message) {
            return res.json({
                statusCode: 400,
                message: 'Please provide all required fields (firstName, lastName, email, message)'
            });
        }

        const savedContact = await contactService.create({ firstName, lastName, email, phone, message });
        res.json({ statusCode: 200, data: savedContact, message: 'Contact information saved successfully' });
    } catch (error) {
        res.json({ statusCode: 500, message: 'Error saving contact information: ' + error.message });
    }
};

// GET /api/contacts
exports.getContacts = async (req, res) => {
    try {
        const contacts = await contactService.getAll();
        res.json({ statusCode: 200, data: contacts, message: 'Success' });
    } catch (error) {
        res.json({ statusCode: 500, data: [], message: 'Error retrieving contacts: ' + error.message });
    }
};
