import pool from '../config/database.js';

// Function to register a patient
export const registerPatient = async ({
    first_name,
    last_name,
    phone,
    email,
    visit_type,
    date_of_birth,
    treatment,
    user_id 
}) => {
    try {
        // Check if the patient already exists
        const existingPatientQuery = 'SELECT * FROM patients WHERE email = $1';
        const existingPatientResult = await pool.query(existingPatientQuery, [email]);

        if (existingPatientResult.rows.length > 0) {
            return { success: false, message: 'Patient already exists' };
        }

        // Insert new patient into the database
        const insertPatientQuery = `
            INSERT INTO patients (
                first_name, last_name, phone, email, visit_type, date_of_birth, treatment, user_id
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING *
        `;

        const newPatientResult = await pool.query(insertPatientQuery, [
            first_name,
            last_name,
            phone,
            email,          
            visit_type,
            date_of_birth,
            treatment,
            user_id
        ]);

        // Retrieve admin user ID dynamically
        const adminQuery = 'SELECT id FROM users WHERE role = $1';
        const adminResult = await pool.query(adminQuery, ['admin']);
        const adminUserId = adminResult.rows[0]?.id;

        // Retrieve doctor user ID dynamically
        const doctorQuery = 'SELECT id FROM users WHERE role = $1 AND email = $2';
        const doctorResult = await pool.query(doctorQuery, ['doctor', email]); // Ensure email is the correct identifier
        const doctorUserId = doctorResult.rows[0]?.id;

        // Notification message
        const notificationMessage = `New patient ${first_name} ${last_name} registered.`;

        // Insert notification for admin and doctor
        const insertNotificationQuery = `
            INSERT INTO notifications (user_id, message) 
            VALUES ($1, $2), ($3, $2)
        `;
        await pool.query(insertNotificationQuery, [adminUserId, notificationMessage, doctorUserId]);

        return {
            success: true,
            message: 'Patient registered successfully',
            patient: newPatientResult.rows[0],
        };
    } catch (error) {
        console.error('Error registering patient:', error);

        // Handle unique constraint violation (e.g., duplicate email)
        if (error.code === '23505') {
            return { success: false, message: 'Email already in use' };
        }

        return {
            success: false,
            message: 'Error registering patient: ' + error.message,
        };
    }
};


export const getAllPatients = async () => {
    try {
        const patientQuery = `
            SELECT
                p.first_name,
                p.last_name,
                p.phone,
                p.email,          
                p.visit_type,
                p.date_of_birth,
                p.treatment,
                p.user_id
            FROM patients AS p
            INNER JOIN users AS u ON p.user_id = u.id
        `;

        const patientListResult = await pool.query(patientQuery);

        return {
            success: true,
            message: 'Patients list loaded successfully',
            patients: patientListResult.rows, // Use `rows` to return data
        };
    } catch (error) {
        console.error('Error loading patients:', error);
        return {
            success: false,
            message: 'Error loading patients: ' + error.message,
        };
    }
};
