import express from 'express';
import { registerUser, verifyUserPassword, getUserById } from '../models/userModel.js';
import authMiddleware from '../middlewares/authMiddleware.js';


const router = express.Router();

// User registration route
router.post('/register', async (req, res) => {
    console.log('Request Body:', req.body);
    const { username, email, password, user_type } = req.body;

    if (!username || !email || !password || !user_type) {
        return res.status(400).json({ success: false, message: "All fields are required." });
    }

    const result = await registerUser(req, res);
    if (result) {
        return; // Prevent further response attempts
    }
});

// User login route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const result = await verifyUserPassword(email, password);
    if (result.success) {
        return res.status(200).json({
            success: true,
            message: result.message,
            user: result.user,
            token: result.token // Ensure this is defined and correctly generated
        });
    } else {
        return res.status(200).json({ success: false, message: result.message }); 
    }
});


// PROTECTED ROUTE to get user info by ID
router.post('/get-user-info-by-id', authMiddleware, async (req, res) => {
    try {
        const userId = req.body.userId;

        // Call the model function to get the user
        const result = await getUserById(userId);

        if (!result.success) {
            return res.status(200).json({ success: false, message: result.message });
        }

        const user = result.user;
        return res.status(200).json({
            success: true,
            data: {
                name: user.username,  
                email: user.email
            }
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error getting user info',
            error: error.message
        });
    }
});

export default router;
