import dotenv from 'dotenv';
import pg from 'pg';

dotenv.config({ path: './config/.env' });

const { Pool } = pg;

// Create a new pool instance
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT),
});

// Function to check database connection
const connectToDatabase = async () => {
    try {
        const client = await pool.connect();
        console.log('Database connected successfully!');

        // Perform a sample query
        const res = await client.query('SELECT NOW() AS current_time');
        console.log('Current time from the database:', res.rows[0].current_time);

        client.release(); // Release the client back to the pool
    } catch (err) {
        console.error('Error connecting to the database:', err.stack);
    }
};

// Call the connection function
connectToDatabase();

export default pool;
