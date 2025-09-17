//validator middleware
const { body, validationResult } = require('express-validator');
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

module.exports = validateContact;
