import express from 'express';
import { registerPatient, getAllPatients } from '../models/patientModel.js'; 
import { body, validationResult } from 'express-validator';


const router = express.Router();

router.post('/register-patient', [
    body('first_name').notEmpty().withMessage('First name is required'),
    body('last_name').notEmpty().withMessage('Last name is required'),
    body('phone').notEmpty().withMessage('Phone number is required'),
    body('email').isEmail().withMessage('Invalid email format'),
    body('visit_type').notEmpty().withMessage('Type of visit is required'),
    body('date_of_birth').isInt().withMessage('Date of birth is required'),
    body('treatment').notEmpty().withMessage('Treatment is required'),
    body('user_id').notEmpty().withMessage('User ID is required'),
], async (req, res) => {
    const errors = validationResult(req); // Check for validation errors
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array()
        });
    }

    const {
        first_name,
        last_name,
        phone,
        email,
        visit_type,
        date_of_birth,
        treatment,
        user_id
    } = req.body;

    console.log("Request Body:", req.body);

    try {
        const result = await registerPatient({
            first_name,
            last_name,
            phone,
            email,
            visit_type,
            date_of_birth,
            treatment,
            user_id
        });
        
        if (result.success) {
            return res.status(201).json(result); 
        } else {
            return res.status(400).json(result); 
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message,
        });
    }
});



router.get('/get-all-patients', async (req, res) => {
    try {
        const result = await getAllPatients(); // Fetch all patients from the database

        if (result.success) {
            return res.status(200).json(result); // Return success response with patient data
        } else {
            return res.status(400).json(result); // Handle error in fetching patients
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
