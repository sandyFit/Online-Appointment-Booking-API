import express from 'express';
import { registerUser, verifyUserPassword, getUserById } from '../models/userModel.js';
import authMiddleware from '../middlewares/authMiddleware.js';


const router = express.Router();

// User registration route
router.post('/register', async (req, res) => {
    const { username, email, password, user_type } = req.body;

    if (!username || !email || !password || !user_type) {
        return res.status(400).json({ success: false, message: "All fields are required." });
    }

    try {
        const result = await registerUser({ username, email, password, user_type });
        if (result.success) {
            return res.status(201).json(result);  // Send the success response
        } else {
            return res.status(400).json(result);  // Handle registration errors
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message,
        });
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
            user: {
                id: result.user.id, // Use result.user.id
                username: result.user.username,
                email: result.user.email,
                user_type: result.user.user_type // Include user_type in response
            },
            token: result.token // Include the generated token
        });
    } else {
        return res.status(400).json({
            success: false,
            message: result.message
        });
    }
});



// PROTECTED ROUTE to get user info by ID
router.post('/get-user-by-id', authMiddleware, async (req, res) => {
    try {
        const userId = req.userId; // Use the decoded ID from the token
        const result = await getUserById(userId);

        if (!result.success) {
            return res.status(200).json({
                success: false,
                message: result.message
            });
        }

        const user = result.user;

        // Log the API response
        console.log('API Response:', {
            success: true,
            data: {
                name: user.username,
                email: user.email
            }
        });

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
