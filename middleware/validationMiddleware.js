import { body, validationResult } from 'express-validator';

export const validateAgentSignup = [
    body('Name').trim().notEmpty().withMessage('Name is required'),
    body('Email').isEmail().withMessage('Invalid email format'),
    body('Password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long'),
    body('LicenseNumber').notEmpty().withMessage('License Number is required'),
    body('ContactNumber')
        .isNumeric()
        .withMessage('Contact Number must be a valid number')
        .isLength({ min: 10, max: 15 })
        .withMessage('Contact Number must be between 10 and 15 digits'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next(); // Proceed if no validation errors
    }
];
