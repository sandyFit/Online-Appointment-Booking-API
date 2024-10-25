import React, { useState, useEffect } from 'react';
import Dashboard from '../components/ui/Dashboard';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { hideLoading, showLoading } from '../redux/alertSlice';
import { TimePicker } from "antd";
import { Button } from "antd";



const RegisterDoctor = () => {
    const dispatch = useDispatch();
    const userIdToRegister = useSelector(state => state.user.userIdToRegister);

    const [formState, setFormState] = useState({
        first_name: '',
        last_name: '',
        phone: '',
        email: '',
        specialty: '',
        experience: '',
        available_hours: ''
    });

    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        });
    };

    const handleTimeChange = (time, timeString) => {
    if (timeString.length === 2) {
        const formattedTime = `${timeString[0]}-${timeString[1]}`;
        setFormState((prevData) => ({
            ...prevData,
            available_hours: formattedTime
        }));
    } else {
        setFormState((prevData) => ({
            ...prevData,
            available_hours: '' // Reset if invalid
        }));
    }
};


    const handleSubmit = async (e) => {
        e.preventDefault();

        // Log user ID
        console.log('User ID to Register:', userIdToRegister);

        const doctorDetails = {
            first_name: formState.first_name,
            last_name: formState.last_name,
            phone: formState.phone,
            email: formState.email,
            specialty: formState.specialty,
            experience: formState.experience,
            available_hours: formState.available_hours,
            user_id: userIdToRegister
        };

        console.log('Doctor Details:', doctorDetails); // Log the details before sending

        try {
            const response = await axios.post('http://localhost:5050/doctors/register-doctor', doctorDetails);
            if (response.data.success) {
                setSuccessMessage('Doctor registered successfully!');
                setErrorMessage('');
                // Reset the form
                setFormState({
                    first_name: '',
                    last_name: '',
                    phone: '',
                    email: '',
                    specialty: '',
                    experience: '',
                    available_hours: ''
                });
            } else {
                setErrorMessage(response.data.errors.join(', ')); // Display validation errors
                setSuccessMessage('');
            }
        } catch (error) {
            if (error.response) {
                console.error('Server response:', error.response.data);
                // Log the validation errors
                if (error.response.data.errors && error.response.data.errors.length > 0) {
                    console.error('Validation Errors:', error.response.data.errors);
                }
                setErrorMessage(error.response.data.message || 'Error registering doctor. Please try again.');
            } else {
                setErrorMessage('Error registering doctor. Please try again.');
            }
            setSuccessMessage('');
        }
    };


    return (
        <Dashboard>
            <h1 className='title-h5 uppercase text-indigo-900 text-center mt-6'>
                New Doctor Registration
            </h1>
            <hr className='border-t-[1px] border-slate-400' />
            <section className="flex justify-center items-center">
                <form onSubmit={handleSubmit} className='flex flex-col gap-3 mt-10'>
                    <h2 className='title-sm uppercase text-indigo-900'>
                        Personal Information
                    </h2>
                    <div className="flex gap-8">
                        <label htmlFor="first_name" className='title-xsm text-indigo-900 flex flex-col uppercase'>
                            First Name
                            <input
                                type="text"
                                name='first_name'
                                id='first_name'
                                placeholder='Enter your first name'
                                required
                                className='input w-[20vw]'
                                value={formState.first_name}
                                onChange={handleChange}
                            />
                        </label>
                        <label htmlFor="last_name" className='title-xsm text-indigo-900 flex flex-col uppercase'>
                            Last Name
                            <input
                                type="text"
                                name='last_name'
                                id='last_name'
                                placeholder='Enter your last name'
                                required
                                className='input w-[20vw]'
                                value={formState.last_name}
                                onChange={handleChange}
                            />
                        </label>
                        <label htmlFor="phone" className='title-xsm text-indigo-900 flex flex-col uppercase'>
                            Phone
                            <input
                                type="text"
                                name='phone'
                                id='phone'
                                placeholder='Enter your phone number'
                                required
                                className='input w-[20vw]'
                                value={formState.phone}
                                onChange={handleChange}
                            />
                        </label>
                    </div>

                    <div className="flex gap-8">
                        <label htmlFor="email" className='title-xsm text-indigo-900 flex flex-col uppercase'>
                            Email
                            <input
                                type="email"
                                name='email'
                                id='email'
                                placeholder='Enter your email address'
                                required
                                className='input w-[20vw]'
                                value={formState.email}
                                onChange={handleChange}
                            />
                        </label>
                    </div>

                    <hr className='border-t-[1px] border-slate-400 mt-3' />

                    <h2 className='title-sm uppercase text-indigo-900 mt-3'>
                        Professional Information
                    </h2>
                    <div className="flex gap-8">
                        <label htmlFor="specialty" className='title-xsm text-indigo-900 flex flex-col uppercase'>
                            Specialty
                            <input
                                type="text"
                                name='specialty'
                                id='specialty'
                                placeholder='Enter your specialty'
                                required
                                className='input w-[20vw]'
                                value={formState.specialty}
                                onChange={handleChange}
                            />
                        </label>
                        <label htmlFor="experience" className='title-xsm text-indigo-900 flex flex-col uppercase'>
                            Experience
                            <input
                                type="number"
                                name='experience'
                                id='experience'
                                placeholder='Enter years of experience'
                                required
                                className='input w-[20vw]'
                                value={formState.experience}
                                onChange={handleChange}
                            />
                        </label>
                        <label htmlFor="available_hours" className='title-xsm text-indigo-900 flex flex-col uppercase'>
                            Consultation Times
                            <TimePicker.RangePicker
                                format="HH:mm:ss"
                                onChange={handleTimeChange}
                                use12Hours={false}
                            />                                                           
                        </label>
                    </div>

                    <div className="flex justify-end uppercase">
                        <Button
                            type='primary'
                            htmlType='submit' 
                        >
                            submit
                        </Button>
                    </div>
                </form>
            </section>
        </Dashboard>
    );
};

export default RegisterDoctor;
