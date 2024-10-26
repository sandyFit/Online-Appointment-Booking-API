import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerDoctor } from '../redux/doctorSlice';
import Dashboard from '../components/ui/Dashboard';
import { Button } from "antd";

const RegisterDoctor = () => {
    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.doctor);
    const [formData, setFormData] = useState({
        first_name: '', last_name: '', phone: '', email: '', specialty: '', experience: '', available_hours: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(registerDoctor(formData));
        console.log()
    };

    return (
        <Dashboard>
            <form onSubmit={handleSubmit} className='flex flex-col justify-center items-center mt-6 gap-4'>
                <div className="flex justify-between gap-4">
                    <input className='input' type="text" name="first_name" onChange={handleChange} placeholder="First Name" />
                    <input className='input' type="text" name="last_name" onChange={handleChange} placeholder="Last Name" />
                    <input className='input' type="text" name="phone" onChange={handleChange} placeholder="Phone" />
                </div>
                <div className="flex justify-between gap-4">
                    <input type="email"
                        name="email"
                        onChange={handleChange}
                        placeholder="Email"
                        className='input'
                    />
                    <input type="text"
                        name="specialty"
                        onChange={handleChange}
                        placeholder="Specialty"
                        className='input'
                    />
                    <input type="number" name="experience" onChange={handleChange} placeholder="Experience (Years)" />
                </div>
                <input className='input' type="text" name="available_hours" onChange={handleChange} placeholder="Available Hours" />
                <div className="flex justify-end uppercase">
                        <Button
                            type='primary'
                            htmlType='submit' 
                        >
                            submit
                        </Button>
                    </div>
                {error && <p>{error}</p>}
            </form>
        </Dashboard>
    );
};

export default RegisterDoctor;
