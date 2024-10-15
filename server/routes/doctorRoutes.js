import express from 'express';
import { registerDoctor } from '../models/doctorModel.js'; // Make sure to include the .js extension
import { body, validationResult } from 'express-validator';


const router = express.Router();

router.post('/register-doctor', [
    body('first_name').notEmpty().withMessage('First name is required'),
    body('last_name').notEmpty().withMessage('Last name is required'),
    body('phone').notEmpty().withMessage('Phone number is required'),
    body('email').isEmail().withMessage('Invalid email format'),
    body('specialty').notEmpty().withMessage('Specialty is required'),
    body('experience').isInt().withMessage('Experience must be a number'),
    body('available_hours').notEmpty().withMessage('Available hours are required'),
    body('user_id').notEmpty().withMessage('User ID is required'),
], async (req, res) => {
    const errors = validationResult(req); // Check for validation errors
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
        available_hours,
        user_id
    } = req.body;

    console.log("Request Body:", req.body);

    try {
        const result = await registerDoctor({
            first_name,
            last_name,
            phone,
            email,
            specialty,
            experience,
            available_hours,
            user_id
        });
        
        if (result.success) {
            return res.status(201).json(result); // Send success response
        } else {
            return res.status(400).json(result); // Handle registration errors
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message,
        });
    }
});

export default router;
