import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const RegisterDoctor = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userIdToRegister = useSelector((state) => state.user.userIdToRegister);

    useEffect(() => {
        if (!userIdToRegister) {
            console.error('User ID to register as doctor is missing. Redirecting to register page.');
            navigate('/register'); // Redirect to registration if user ID is missing
        } else {
            console.log('User ID to register as doctor:', userIdToRegister);
            // Proceed with doctor registration logic
        }
    }, [userIdToRegister, navigate]);

    return (
        <div>
            <h2>Register Doctor</h2>
            <p>User ID to register as doctor: {userIdToRegister}</p>
            {/* Registration form for doctor */}
        </div>
    );
};

export default RegisterDoctor;
