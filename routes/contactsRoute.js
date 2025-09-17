// routes/contactsRoute.js
const express = require('express');
const router = express.Router();

const contactsController = require('../controllers/contactsController');
const validator = require('../middleware/validator');
const requestValidationMiddleware = require('../middleware/requestValidationMiddleware');

//import validateContact from '../middleware/validator';
// Apply the validator middleware to POST and PUT routes
router.post('/', validator.createUserValidator, requestValidationMiddleware, contactsController.createContact);
router.put('/:id', validator.createUserValidator, requestValidationMiddleware, contactsController.updateContact);


// GET /contacts
router.get('/', contactsController.getAllContacts);

// GET /contacts/:id
router.get('/:id', contactsController.getContactById);

// POST /contacts
//router.post('/', contactsController.createContact);

// PUT /contacts/:id
//router.put('/:id', contactsController.updateContact);

// DELETE /contacts/:id
router.delete('/:id', contactsController.deleteContact);

module.exports = router;


/*
const express = require('express');
const router = express.Router();

const contactsController = require('../controllers/contacts');
const validation = require('../middleware/validate');

router.get('/', contactsController.getAll);

router.get('/:id', contactsController.getSingle);

router.post('/', validation.saveContact, contactsController.createContact);

router.put('/:id', validation.saveContact, contactsController.updateContact);

router.delete('/:id', contactsController.deleteContact);

module.exports = router;

*/


/*
import express from 'express'
const router = express.Router()

import { getUserById, createUser } from '../controllers/userController.js'
import requestValidationMiddleware from '../middleware/requestValidationMiddleware.js'
import { getUserByIdValidator, createUserValidator } from '../middleware/validators/userValidators.js'

router.route('/:id')
    .get(getUserByIdValidator, requestValidationMiddleware, getUserById)
    .post(createUserValidator, requestValidationMiddleware, createUser)

export default router*/
