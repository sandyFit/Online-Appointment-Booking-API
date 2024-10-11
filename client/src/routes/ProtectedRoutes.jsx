import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setUser } from '../redux/userSlice';
import { showLoading, hideLoading, setError } from '../redux/alertSlice'; // Import alert actions
import Loader from '../components/ui/Loader';

const ProtectedRoutes = (props) => {
    const { user } = useSelector((state) => state.user);
    const { loading, error } = useSelector((state) => state.alerts); // Access loading and error state
    const dispatch = useDispatch();
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    const getUser = async () => {
        if (!token) {
            return; // No need to call API if there's no token
        }

        dispatch(showLoading()); // Set loading state to true
        try {
            const response = await axios.post('http://localhost:5050/users/get-user-by-id', {
                token: token
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            console.log('API Response:', response.data); // Log the API response

            if (response.data.success) {
                // Update user state only if the user data has changed
                if (JSON.stringify(user) !== JSON.stringify(response.data.data)) {
                    dispatch(setUser(response.data.data));
                }
            } else {
                dispatch(setError('Failed to fetch user data.'));
                localStorage.clear();
                navigate('/login'); // Redirect if user fetching fails
            }
        } catch (error) {
            console.error("Error fetching user:", error);
            dispatch(setError('An error occurred while fetching user data.'));
            localStorage.clear();
            navigate('/login'); 
        } finally {
            dispatch(hideLoading()); // Reset loading state
        }
    };

    useEffect(() => {
        // Fetch user only if user is not set and token exists
        if (!user && token) { 
            getUser();
        }
    }, [user, token]); // Dependency array includes only user and token

    // Show loading indicator while fetching user
    if (loading) {
        return <Loader />;
    }

    // Show error message if it exists
    if (error) {
        return <div className="error-message">{error}</div>; // Replace with your error display component if you have one
    }

    return user ? props.children : <Navigate to='/login' />;
};

export default ProtectedRoutes;
