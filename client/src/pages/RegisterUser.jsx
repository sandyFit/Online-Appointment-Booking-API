import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../redux/userSlice';

const RegisterUser = () => {
    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.user);
    const [formData, setFormData] = useState({ username: '', email: '', password: '', user_type: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(registerUser(formData));
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="username" onChange={handleChange} placeholder="Username" />
            <input type="email" name="email" onChange={handleChange} placeholder="Email" />
            <input type="password" name="password" onChange={handleChange} placeholder="Password" />
            <input type="text" name="user_type" onChange={handleChange} placeholder="User Type" />
            <button type="submit" disabled={loading}>Register</button>
            {error && <p>{error}</p>}
        </form>
    );
};

export default RegisterUser;
