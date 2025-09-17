//import { validationResult } from 'express-validator'
const validationResult = require('express-validator').validationResult;

module.exports = function requestValidationMiddleware(req, res, next) {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    next()
}