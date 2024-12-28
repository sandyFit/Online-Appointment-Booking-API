import pool from '../config/database.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


// ***** UTILITY FUNCTION TO QUERY USERS *******
const queryUser = async (condition, params) => {
    try {
        const query = `SELECT * FROM users WHERE ${condition}`;
        const result = await pool.query(query, params);

        if (result.rows.length === 0) {
            return {
                success: false,
                message: 'User not found'
            }
        }
        return {
            success: true,
            user: result.rows[0]
        }
    } catch (error)
    {
        console.error('Error querying user', error);
        return {
            success: false,
            message: 'Error querying user' + error.message
        }
    }
};

// **** FUNCTION TO REGISTER A NEW USER ****
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
        const insertUserQuery = `INSERT INTO users (username, email, password, user_type) 
                                VALUES ($1, $2, $3, $4) RETURNING *`;
        const newUserResult = await pool.query(insertUserQuery, [username, email, hashedPassword, user_type]);

        return {
            success: true,
            message: 'User registered successfully',
            user: newUserResult.rows[0],
        };
    } catch (error) {
        console.error('Error registering user:', error);
        return {
            success: false,
            message: 'Error registering user' + error.message
        };
    }
};


export const findUserByEmail = async (email) => {
    try {
        const userQuery = 'SELECT * FROM users WHERE email = $1';
        const userResult = await pool.query(userQuery, [email]);

        if (userResult.rows.length === 0) {
            return { success: false, message: 'User not found' };
        }

        return { success: true, user: userResult.rows[0] };
    } catch (error) {
        console.error('Error finding user by email:', error.stack);
        return {
            success: false,
            message: 'Error finding user' + error.message
        };
    }
};


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
            return { success: false, message: 'Incorrect user or password' }; 
        }

        // Generate token
        const token = jwt.sign(
            { id: user.id, user_type: user.user_type },  // Optionally include 'user_type'
            process.env.JWT_SECRET, 
            { expiresIn: '1d' }
        ); 
        
        return {
            success: true,
            message: 'Login successful',
            user: {
                id: user.id,               
                user_type: user.user_type
            },
            token            
        };
    } catch (error) {
        console.error('Error verifying user:', error.stack);
        return {
            success: false,
            message: 'Error verifying user' + error.message
        };
    }
};

// Function to get user by ID
export const getUserById = async (userId) => {
    return queryUser('id=$1', [userId]);
};




