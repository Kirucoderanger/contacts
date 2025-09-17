//validator middleware
/*const { body, validationResult } = require('express-validator');
//const body = require('express-validator').body;
//const validationResult = require('express-validator').validationResult;
const validateContact = [
    body('firstName').isString().withMessage('First name must be a string').notEmpty().withMessage('First name is required'),
    body('lastName').isString().withMessage('Last name must be a string').notEmpty().withMessage('Last name is required'),  
    body('email').isEmail().withMessage('Invalid email format').notEmpty().withMessage('Email is required'),
    body('favoriteColor').isString().withMessage('Favorite color must be a string').optional({ nullable: true, checkFalsy: true }),
    body('birthday').isISO8601().withMessage('Birthday must be a valid date').optional({ nullable: true, checkFalsy: true }),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = validateContact;*/


//import { body, param } from 'express-validator'
const body = require('express-validator').body;

/*const getUserByIdValidator = [
    param('id')
        .isUUID()
        .withMessage('Valid user ID is required (expects: UUID)'),
}*/

const createUserValidator = [
    body('firstName')
        .trim()
        .notEmpty().withMessage('First name is required')
        .isAlpha()
        .isLength({ max: 100 }).withMessage('First name cannot exceed 100 characters'),
    body('lastName')
        .trim()
        .notEmpty().withMessage('Last name is required')
        .isAlpha()
        .isLength({ max: 100 }).withMessage('Last name cannot exceed 100 characters'),

    body('email')
        .isEmail().withMessage('Valid email is required')
        .isLength({ max: 320 }).withMessage('Email cannot exceed 320 characters')
        .normalizeEmail(),

    body('birthday')
        .isISO8601({ strict: true })
        .withMessage('Valid birthday is required (expected: ISO8601 yyyy-MM-dd)')
        .custom((value) => {
            return value < new Date(Date.now()).getFullYear() - 21
        })
        .withMessage('User must be at least 21 years of age'),
    body('favoriteColor')
        .optional()
        .isLength({ max: 50 })
        .withMessage('Favorite color cannot exceed 50 characters in length'),

    /*body('role')
        .isIn(["USER", "MANAGER", "ADMIN", "SYSTEM_ADMIN"])
        .withMessage('Valid role is required'),

    body('comments')
        .optional()
        .isLength({ max: 500 })
        .withMessage('Comments cannot exceed 500 characters in length'),
        */
]

module.exports = {
    //getUserByIdValidator,
    createUserValidator,
}


/*
const Validator = require('validatorjs');
const validator = (body, rules, customMessages, callback) => {
  const validation = new Validator(body, rules, customMessages);
  validation.passes(() => callback(null, true));
  validation.fails(() => callback(validation.errors, false));
};

module.exports = validator;


const validator = require('../helpers/validate');

const saveContact = (req, res, next) => {
  const validationRule = {
    firstName: 'required|string',
    lastName: 'required|string',
    email: 'required|email',
    favoriteColor: 'required|string',
    birthday: 'string'
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

module.exports = {
  saveContact
};*/