import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRouter from './routes/userRoute.js'; // Ensure the path is correct

dotenv.config({ path: './config/.env' });

const app = express();
const PORT = 5050

// Middleware
app.use(cors()); // Enable CORS for all requests
app.use(express.json()); // Parse incoming JSON requests

// User routes
app.use('/users', userRouter); // Route for user-related requests

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT} in mode: ${process.env.NODE_ENV}`);
});
