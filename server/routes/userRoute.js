import express from 'express';
import { registerUser, verifyUserPassword, getUserById } from '../models/userModel.js';
import { registerDoctor } from '../models/doctorModel.js'; // Import doctor registration function
import { registerPatient } from '../models/patientModel.js'; // Import patient registration function
import authMiddleware from '../middlewares/authMiddleware.js';
import { body, validationResult } from 'express-validator';

const router = express.Router();

// User Registration
router.post('/register', async (req, res) => {
    const { username, email, password, user_type } = req.body;
    if (!username || !email || !password || !user_type) {
        return res.status(400).json({ success: false, message: "All fields are required." });
    }
    try {
        const result = await registerUser({ username, email, password, user_type });
        res.status(result.success ? 200 : 400).json(result);
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message,
        });
    }
});

// User Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const result = await verifyUserPassword(email, password);
    if (result.success) {
        return res.status(200).json({
            success: true,
            message: result.message,
            user: result.user,
            token: result.token
        });
    } else {
        return res.status(400).json({ success: false, message: result.message });
    }
});

// Role Registration (Doctor)
router.post('/register-doctor', authMiddleware, [
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
        phone, email,
        specialty,
        experience,
        available_hours
    } = req.body;
    const user_id = req.user.id; // Retrieve user_id from auth middleware

    try {
        const result = await registerDoctor({
            user_id,
            first_name,
            last_name,
            phone,
            email,
            specialty,
            experience,
            available_hours
        });
        res.status(result.success ? 201 : 400).json(result);
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
});

// Role Registration (Patient)
router.post('/register-patient', authMiddleware, [
    body('first_name').notEmpty().withMessage('First name is required'),
    body('last_name').notEmpty().withMessage('Last name is required'),
    body('phone').notEmpty().withMessage('Phone number is required'),
    body('email').isEmail().withMessage('Invalid email format'),
    body('visit_type').notEmpty().withMessage('Type of visit is required'),
    body('date_of_birth').isInt().withMessage('Date of birth is required'),
    body('treatment').notEmpty().withMessage('Treatment is required'),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }

    const {
        first_name,
        last_name,
        phone, email,
        visit_type,
        date_of_birth,
        treatment } = req.body;
    const user_id = req.user.id; // Retrieve user_id from auth middleware

    try {
        const result = await registerPatient({
            user_id,
            first_name,
            last_name,
            phone,
            email,
            visit_type,
            date_of_birth,
            treatment
        });
        res.status(result.success ? 201 : 400).json(result);
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
});

// PROTECTED ROUTE to get user info by ID
router.post('/get-user-by-id', authMiddleware, async (req, res) => {
    try {
        const userId = req.user.id;
        const result = await getUserById(userId);
        if (!result.success) {
            return res.status(404).json({ success: false, message: result.message });
        }

        return res.status(200).json({ success: true, data: result.user });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Error getting user info', error: error.message });
    }
});

export default router;
