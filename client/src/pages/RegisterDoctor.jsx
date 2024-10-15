import React, { useState } from 'react';
import Dashboard from '../components/ui/Dashboard';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { hideLoading, showLoading } from '../redux/alertSlice';
import { TimePicker } from "antd";
import { Button } from "antd";

const RegisterDoctor = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        first_name: '', 
        last_name: '',
        phone: '',
        email: '',
        specialty: '',
        experience: '',
        available_hours: ''
    });

    // Handle regular input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    // Handle TimePicker change
    const handleTimeChange = (time, timeString) => {
        const formattedTime = `${timeString[0]}-${timeString[1]}`;
        setFormData(prevData => ({
            ...prevData,
            available_hours: formattedTime // Save as "HH:mm:ss-HH:mm:ss"
        }));
    };

    console.log(`Updated formData: ${JSON.stringify(formData)}`);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(`Form values before submit: ${JSON.stringify(formData)}`);

        try {
            dispatch(showLoading());
            const response = await axios.post('http://localhost:5050/doctors/register-doctor', formData, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            dispatch(hideLoading());

            if (response.data.success) {
                console.log(response.data.message);
                toast.success(response.data.message);
                navigate('/manage-doctors');
            } else {
                console.log(response.data.message);
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log('Something went wrong:', error.response?.data || error.message);
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
                                value={formData.first_name}
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
                                value={formData.last_name}
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
                                value={formData.phone}
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
                                value={formData.email}
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
                                value={formData.specialty}
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
                                value={formData.experience}
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
                            onClick={() => navigate('/register-patient')}
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
