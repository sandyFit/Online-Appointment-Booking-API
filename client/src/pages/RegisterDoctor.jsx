import React, { useState, useEffect } from 'react';
import Dashboard from '../components/ui/Dashboard';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { hideLoading, showLoading } from '../redux/alertSlice';
import { TimePicker } from "antd";
import { Button } from "antd";
import { setUserIdToRegister } from '../redux/userSlice';


const RegisterDoctor = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    // Assuming you have a way to get the new doctor's information from a form or selection
    const [newDoctor, setNewDoctor] = useState({
        first_name: '',
        last_name: '',
        phone: '',
        email: '',
        specialty: '',
        experience: '',
        available_hours: '',
        
    });

    // Example: Set user_id for the doctor to be registered (this should come from your user creation logic)
    const userId = useSelector((state) => state.user.userIdToRegister);

    console.log("User ID to register as doctor:", userId);

    useEffect(() => {
        console.log('User ID to register as doctor:', userId); // Check user ID
        if (!userId) {
            console.error('User ID to register as doctor is missing.');
        }
    }, [userId]);



    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewDoctor({
            ...newDoctor,
            [name]: value
        });
    };

    const handleTimeChange = (time, timeString) => {
        const formattedTime = `${timeString[0]}-${timeString[1]}`;
        setNewDoctor((prevData) => ({
            ...prevData,
            available_hours: formattedTime
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        

        const doctorData = { 
        ...newDoctor, 
        user_id: userId // This must be the user ID for the doctor
    };


        // Add validation for userId here if necessary
        if (!userId) {
            toast.error('User ID is required to register a doctor.');
            return;
        }
        console.log("Register Doctor data:", doctorData); 

        try {
            dispatch(showLoading());
            const response = await axios.post('http://localhost:5050/doctors/register-doctor', doctorData, {
                headers: { 'Content-Type': 'application/json' }
            });

            dispatch(hideLoading());
            console.log('API Response:', response.data);

            if (response.data.success) {
                const userIdFromResponse = response.data.user?.id; // Check if user.id exists
                if (userIdFromResponse) {
                    console.log('User ID:', userIdFromResponse);
                    dispatch(setUserIdToRegister(userIdFromResponse)); // Dispatch the user ID to Redux
                } else {
                    console.error('User ID is missing from response.');
                }

                navigate('/manage-doctors');
                setNewDoctor({ // Reset form
                    first_name: '',
                    last_name: '',
                    phone: '',
                    email: '',
                    specialty: '',
                    experience: '',
                    available_hours: '',
                });
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error('Something went wrong:', error.response?.data || error.message);
            dispatch(hideLoading());
            toast.error('Something went wrong');
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
                                value={newDoctor.first_name}
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
                                value={newDoctor.last_name}
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
                                value={newDoctor.phone}
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
                                value={newDoctor.email}
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
                                value={newDoctor.specialty}
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
                                value={newDoctor.experience}
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
