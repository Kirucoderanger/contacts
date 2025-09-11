const mongodb = require('../data/database');
const objectId = require('mongodb').ObjectId;

const { ObjectId } = require('mongodb'); // make sure you import ObjectId

const getContactById = async (req, res) => {
  try {
    const contactId = new ObjectId(req.params.id);

    const result = await mongodb
      .getDatabase()
      .db()
      .collection('contacts')
      .findOne({ _id: contactId });

    if (!result) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Fetching contact failed!' });
  }
};


const getAllContacts = (req, res) => {
  try {
    const db = mongodb.getDatabase();
    const contactsCollection = db.db().collection('contacts');
    contactsCollection.find().toArray()
      .then(contacts => {
        res.status(200).json(contacts);
      })
      .catch(err => {
        console.error('Error fetching contacts:', err);
        res.status(500).json({ error: 'An error occurred while fetching contacts' });
      });
    } catch (err) {
        console.error('Error fetching contacts:', err);
        res.status(500).json({ error: 'An error occurred while fetching contacts' });
    }
};

/*const getContactById = (req, res) => {
  const contactId = req.params.id;
    try {
        const db = mongodb.getDatabase();
        const contactsCollection = db.db().collection('contacts');
        contactsCollection.findOne({ _id: contactId })
        .then(contact => {
            if (!contact) {
                return res.status(404).json({ error: 'Contact not found' });
            }
            res.status(200).json(contact);
        })
        .catch(err => {
            console.error('Error fetching contact:', err);
            res.status(500).json({ error: 'An error occurred while fetching contact' });
        });
    } catch (err) {
        console.error('Error fetching contact:', err);
        res.status(500).json({ error: 'An error occurred while fetching contact' });
    }
};*/

const createContact = async (req, res) => {
  const newContact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
  };
    try {
        //const db = mongodb.getDatabase();
        //const contactsCollection = db.db().collection('contacts');
        //const result = await contactsCollection.insertOne(newContact);
        //res.status(204).send();
        const result = await mongodb.getDatabase().db().collection('contacts').insertOne(newContact);
        res.status(201).json(result);
        
        //res.setHeader('Content-Type', 'application/json');
        //res.status(201).json(result.ops[0]);
    } catch (err) {
        console.error('Error creating contact:', err);
        res.status(500).json({ error: 'An error occurred while creating contact' });
    }
};
const updateContact = async (req, res) => {
    const contactId = req.params.id;
    const updatedContact = req.body;
    try {
        const db = mongodb.getDatabase();
        const contactsCollection = db.db().collection('contacts');
        const result = await contactsCollection.updateOne(
            { _id: new objectId(contactId) },
            { $set: updatedContact }
        );
        if (result.matchedCount === 0) {
            return res.status(404).json({ error: 'Contact not found' });
        }
        res.status(200).json({ message: 'Contact updated successfully' });
    } catch (err) {
        console.error('Error updating contact:', err);
        res.status(500).json({ error: 'An error occurred while updating contact' });
    }
};
const deleteContact = async (req, res) => {
    const contactId = req.params.id;
    try {
        const db = mongodb.getDatabase();
        const contactsCollection = db.db().collection('contacts');
        const result = await contactsCollection.deleteOne({ _id: new objectId(contactId) });
        if (result.deletedCount === 0) {
            return res.status(404).json({ error: 'Contact not found' });
        }
        res.status(200).json({ message: 'Contact deleted successfully' });
    } catch (err) {
        console.error('Error deleting contact:', err);
        res.status(500).json({ error: 'An error occurred while deleting contact' });
    }
};
module.exports = {
    
    getAllContacts,
    createContact,
    updateContact,
    deleteContact,
    getContactById
};



/*exports.getAllContacts = (req, res) => {
  try {
    const db = mongodb.getDatabase();
    const contactsCollection = db.db().collection('contacts');
    contactsCollection.find().toArray()
      .then(contacts => {
        res.status(200).json(contacts);
      })
      .catch(err => {
        console.error('Error fetching contacts:', err);
        res.status(500).json({ error: 'An error occurred while fetching contacts' });
      });
  } catch (err) {
    console.error('Error fetching contacts:', err);
    res.status(500).json({ error: 'An error occurred while fetching contacts' });
  }
};
// Additional controller methods (create, update, delete) can be added here
//module.exports = exports;
module.exports = { getAllContacts };*/