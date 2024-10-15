import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRouter from './routes/userRoute.js'; 
import doctorRouter from './routes/doctorRoutes.js';
import patientRouter from './routes/patientRoutes.js';

dotenv.config({ path: './config/.env' });

const app = express();
const PORT = 5050

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/users', userRouter); 
app.use('/doctors', doctorRouter); 
app.use('/patients', patientRouter);

// 404 Catch-All Route
app.use((req, res, next) => {
    res.status(404).json({ success: false, message: 'Route not found' });
});

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ success: false, message: 'Server Error' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT} in mode: ${process.env.NODE_ENV}`);
});