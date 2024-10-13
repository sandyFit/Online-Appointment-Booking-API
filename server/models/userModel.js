import pool from '../config/database.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Function to register a new user
export const registerUser = async ({ username, email, password, user_type }) => {
    try {
        // Check if user already exists
        const existingUserQuery = 'SELECT * FROM users WHERE email = $1';
        const existingUserResult = await pool.query(existingUserQuery, [email]);

        if (existingUserResult.rows.length > 0) {
            return { success: false, message: 'User already exists' };
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Insert new user
        const insertUserQuery = 'INSERT INTO users (username, email, password, user_type) VALUES ($1, $2, $3, $4) RETURNING *';
        const newUserResult = await pool.query(insertUserQuery, [username, email, hashedPassword, user_type]);

        return {
            success: true,
            message: 'User registered successfully',
            user: newUserResult.rows[0],
        };
    } catch (error) {
        console.error('Error registering user:', error);
        return { success: false, message: 'Error registering user' };
    }
};



// Function to find a user by email
export const findUserByEmail = async (email) => {
    try {
        const userQuery = 'SELECT * FROM users WHERE email = $1';
        const userResult = await pool.query(userQuery, [email]);

        if (userResult.rows.length === 0) {
            return { success: false, message: 'User not found' };
        }

        return { success: true, user: userResult.rows[0] };
    } catch (err) {
        console.error('Error finding user by email:', err.stack);
        return { success: false, message: 'Error finding user' };
    }
};


// Function to verify user password
export const verifyUserPassword = async (email, password) => {
    try {
        // Find user by email
        const userResult = await findUserByEmail(email);
        if (!userResult.success) {
            // Check if the user was not found and provide a specific message
            return { success: false, message: userResult.message }; // This will return 'User not found'
        }

        const user = userResult.user;

        // Compare password with the hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return { success: false, message: 'Incorrect user or password' }; // Provide a specific message for incorrect password
        }

        // Generate token
        const token = jwt.sign({ id: user.id, user_type: user.user_type },
            process.env.JWT_SECRET,
            { expiresIn: '1d' });
        
        return { success: true, message: 'Login successful', user, token };
    } catch (err) {
        console.error('Error verifying user password:', err.stack);
        return { success: false, message: 'Error verifying password' };
    }
};

// Function to get user by ID
export const getUserById = async (userId) => {
    try {
        const userQuery = 'SELECT * FROM users WHERE id = $1';
        const userResult = await pool.query(userQuery, [userId]);

        if (userResult.rows.length === 0) {
            return { success: false, message: 'User does not exist' };
        }

        return { success: true, user: userResult.rows[0] };
    } catch (error) {
        console.error('Error getting user by ID:', error);
        return { success: false, message: 'Error getting user', error };
    }
};
