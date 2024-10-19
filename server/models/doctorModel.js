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
    try
    {   
        // IF user_id IS NOT PROVIDED, GET IT BASED ON THE EMAIL
        if (!user_id)
        {
            const userQuery = `SELECT id FROM users WHERE email = $1`;
            const userResult = await pool.query(userQuery, [email]);

            if (userResult.rows.length === 0) {
                return {
                    success: false,
                    message: 'User not found with this email'
                }
            }
            user_id = userResult.rows[0].id; // USING THE FOUND user_id
        }

        // CHECK IF DOCTOR ALREADY EXISTS
        const existingDoctorQuery = 'SELECT * FROM doctors WHERE email = $1';
        const existingDoctorResult = await pool.query(existingDoctorQuery, [email]);

        if (existingDoctorResult.rows.length > 0) {
            return { success: false, message: 'Doctor already exists' };
        }

        // VALIDATE AVAILABLE HOURS INPUT (expected format: "HH:mm:ss-HH:mm:ss")
        const availableHoursArray = available_hours.split('-').map(time => time.trim());
        const startHour = moment(availableHoursArray[0], 'HH:mm:ss').format('HH:mm:ss');
        const endHour = moment(availableHoursArray[1], 'HH:mm:ss').format('HH:mm:ss');

        const validateWorkingHours = (start, end) => {
            const openingTime = moment('08:00:00', 'HH:mm:ss');
            const closingTime = moment('18:00:00', 'HH:mm:ss');

            const startMoment = moment(start, 'HH:mm:ss', true); // STRICT PARSING
            const endMoment = moment(end, 'HH:mm:ss', true); // STRICT PARSING

            // CHECK FOR VALID TIMES
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

        // GET THE CURRENT DATE TO CREATE TIMESTAMPS
        const currentDate = moment().format('YYYY-MM-DD');

        // CREATE FULL TIMESTAMPS FOR THE AVAILABLE HOURS
        const startTimestamp = `${currentDate} ${startHour}`;
        const endTimestamp = `${currentDate} ${endHour}`;

        // USE THE FULL TIMESTAMPS FOR THE TSRANGE IN THE SQL QUERY 
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
        console.log("User ID in registerDoctor:", user_id);
        // RETRIEVE ADMIN USER ID DYNAMICALLY
        const adminQuery = 'SELECT id FROM users WHERE user_type = $1';
        const adminResult = await pool.query(adminQuery, ['admin']);
        
        // CHECK IF ADMIN EXISTS
        if (adminResult.rows.length === 0) {
            console.warn('No admin found to notify');
        } else {
            const adminUserId = adminResult.rows[0]?.id;
            const notificationMessage = `New doctor ${first_name} ${last_name} registered.`;
            const insertNotificationQuery = `
                INSERT INTO notifications (user_id, message) 
                VALUES ($1, $2)
            `;
            await pool.query(insertNotificationQuery, [adminUserId, notificationMessage]);
        }
        return {
            success: true,
            message: 'Doctor registered successfully',
            doctor: newDoctorResult.rows[0],
        };
    } catch (error) {
        console.error('Error registering doctor:', error);

        // CAPTURE SPECIFIC ERRORS IF POSSIBLE, LIKE UNIQUE CONSTRAINT VIOLATIONS 
        if (error.code === '23505') {
            return { success: false, message: 'Email already in use' };
        }

        return {
            success: false,
            message: 'Error registering doctor: ' + error.message
        };
    }
};
