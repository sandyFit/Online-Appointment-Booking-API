import express from 'express';
import { registerDoctor } from '../models/doctorModel.js';
import { body, validationResult } from 'express-validator';
import authMiddleware from '../middlewares/authMiddleware.js'; // Import auth middleware

const router = express.Router();

router.post('/register-doctor', authMiddleware, [ // Apply auth middleware here
    body('first_name').notEmpty().withMessage('First name is required'),
    body('last_name').notEmpty().withMessage('Last name is required'),
    body('phone').notEmpty().withMessage('Phone number is required'),
    body('email').isEmail().withMessage('Invalid email format'),
    body('specialty').notEmpty().withMessage('Specialty is required'),
    body('experience').isInt().withMessage('Experience must be a number'),
    body('available_hours').notEmpty().withMessage('Available hours are required'),
], async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }

    const {
        first_name,
        last_name,
        phone,
        email,
        specialty,
        experience,
        available_hours
    } = req.body;

    const user_id = req.user.id; // Retrieve user_id from auth middleware

    console.log("Request Body for Doctor Registration:", req.body);

    try {
        const result = await registerDoctor({
            user_id,
            first_name,
            last_name,
            phone,
            email,
            specialty,
            experience,
            available_hours,
        });
        
        res.status(result.success ? 201 : 400).json(result);
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message,
        });
    }
});

export default router;
