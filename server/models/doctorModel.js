import pool from '../config/database.js';
import moment from 'moment';

export const registerDoctor = async ({
    first_name,
    last_name,
    phone,
    email,
    specialty,
    experience,
    available_hours,
    user_id
}) => {
    try {
        // Check if doctor already exists
        const existingDoctorQuery = 'SELECT * FROM doctors WHERE email = $1';
        const existingDoctorResult = await pool.query(existingDoctorQuery, [email]);

        if (existingDoctorResult.rows.length > 0) {
            return { success: false, message: 'Doctor already exists' };
        }

        // Validate available_hours input (expected format: "HH:mm:ss-HH:mm:ss")
        const availableHoursArray = available_hours.split('-').map(time => time.trim());
        const startHour = moment(availableHoursArray[0], 'HH:mm:ss').format('HH:mm:ss');
        const endHour = moment(availableHoursArray[1], 'HH:mm:ss').format('HH:mm:ss');

        const validateWorkingHours = (start, end) => {
            const openingTime = moment('08:00:00', 'HH:mm:ss');
            const closingTime = moment('18:00:00', 'HH:mm:ss');

            const startMoment = moment(start, 'HH:mm:ss', true); // strict parsing
            const endMoment = moment(end, 'HH:mm:ss', true); // strict parsing

            // Check for valid times
            if (!startMoment.isValid() || !endMoment.isValid()) {
                return {
                    valid: false,
                    message: 'Invalid time format.'
                };
            }

            if (startMoment.isBefore(openingTime) || endMoment.isAfter(closingTime)) {
                return {
                    valid: false,
                    message: 'Working hours must be between 08:00 and 18:00'
                };
            }
            if (startMoment.isSameOrAfter(endMoment)) {
                return {
                    valid: false,
                    message: 'Start time must be before end time.'
                };
            }

            return { valid: true, message: '' };
        };


        const validationResult = validateWorkingHours(startHour, endHour);

        if (!validationResult.valid) {
            return {
                success: false,
                message: validationResult.message
            };
        }

        // Get the current date to create timestamps
        const currentDate = moment().format('YYYY-MM-DD');

        // Create full timestamps for the available hours
        const startTimestamp = `${currentDate} ${startHour}`;
        const endTimestamp = `${currentDate} ${endHour}`;

        // Use the full timestamps for the tsrange in the SQL query
        const insertDoctorQuery = `
            INSERT INTO doctors (
                first_name, last_name, phone, email, specialty, experience, available_hours, user_id
            ) VALUES ($1, $2, $3, $4, $5, $6, tsrange($7::timestamp, $8::timestamp), $9)
            RETURNING *
        `;

        const newDoctorResult = await pool.query(insertDoctorQuery, [
            first_name,
            last_name,
            phone,
            email,
            specialty,
            experience,
            startTimestamp, 
            endTimestamp,
            user_id
        ]);

        const adminUserId = 1; // Assuming admin has a fixed user_id (you can fetch this dynamically)
        const notificationMessage = `New doctor ${first_name} ${last_name} registered.`;

        const insertNotificationQuery = `
            INSERT INTO notifications (user_id, message) 
            VALUES ($1, $2)
        `;
        await pool.query(insertNotificationQuery, [adminUserId, notificationMessage]);

        return {
            success: true,
            message: 'Doctor registered successfully',
            doctor: newDoctorResult.rows[0],
        };
    } catch (error) {
        console.error('Error registering doctor:', error);

        // Capture specific errors if possible, like unique constraint violations
        if (error.code === '23505') {
            return { success: false, message: 'Email already in use' };
        }

        return { success: false, message: 'Error registering doctor: ' + error.message };
    }
};
