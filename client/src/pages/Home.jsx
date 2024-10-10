import React, { useEffect } from 'react';
import axios from 'axios';
import Dashboard from '../components/ui/Dashboard';

const Home = () => {
    const getData = async () => {
        try {
            const token = localStorage.getItem('token');
            const userId = 4; // Replace this with the actual user ID you want to fetch, or obtain dynamically

            const response = await axios.post('http://localhost:5050/users/get-user-info-by-id', {
                userId: userId // Pass the user ID in the request body
            }, {
                headers: {
                    Authorization: `Bearer ${token}` // Ensure there is no extra space after Bearer
                }
            });
            console.log(response.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <Dashboard>
            <h1>Homepage</h1>
        </Dashboard>
    )
};

export default Home;
