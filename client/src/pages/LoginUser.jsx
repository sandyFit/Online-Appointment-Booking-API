import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/userSlice';
import { setToken } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';

const LoginUser = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error, user } = useSelector((state) => state.user);
    const [formData, setFormData] = useState({ email: '', password: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginUser(formData)).then(({ payload }) => {
            if (payload && payload.token) {
                dispatch(setToken(payload.token));
                navigate('/');
            }
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="email" name="email" onChange={handleChange} placeholder="Email" />
            <input type="password" name="password" onChange={handleChange} placeholder="Password" />
            <button type="submit" disabled={loading}>Login</button>
            {error && <p>{error}</p>}
            {user && <p>Welcome, {user.username}</p>}
            
        </form>
    );
};

export default LoginUser;
