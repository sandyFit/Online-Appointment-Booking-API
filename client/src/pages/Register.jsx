import React, { useState } from 'react';
import Button from '../components/buttons/Button';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { hideLoading, showLoading } from '../redux/alertReducer';


const Register = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '', 
        email: '',
        password: '',
        user_type: 'patient' // Consistent naming
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(`Form values: ${JSON.stringify(formData)}`);

        try {
            dispatch(showLoading());
            const response = await axios.post('http://localhost:5050/users/register', formData);
            dispatch(hideLoading());

            if (response.data.success) {
                console.log(response.data.message)
                toast.success(response.data.message);
                toast('Redirecting to Login page');
                navigate('/login');
            }
            else {
                console.log(response.data.message)
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log('Something went wrong');
            dispatch(hideLoading());
            toast.error('Something went wrong');
        }
    };


    return (
        <section className='h-screen flex items-center justify-center bg-indigo-500'>
            <article className='bg-slate-300 w-[56vw] h-[70vh] rounded-[10px] relative'>
                <div className="w-[18vw] bg-indigo-900 rounded-bl-lg py-2 absolute top-6 -left-6">
                    <h1 className='text-zinc-300 text-[1.6rem] font-[600] text-center'>Nice to Meet You</h1>
                </div>  
                
                <form onSubmit={handleSubmit} className='flex flex-col justify-center items-center mt-28 gap-6'>
                    <div className="flex gap-6">

                        <label htmlFor="username" className='flex flex-col title-sm uppercase text-indigo-900'>
                            Username
                            <input 
                                type="text" 
                                name="username" 
                                id="username" 
                                placeholder="Enter your username"
                                required
                                className='input'
                                value={formData.username}
                                onChange={handleChange}
                            />
                        </label>

                        <label htmlFor="email" className='flex flex-col title-sm uppercase text-indigo-900'>
                            Email
                            <input 
                                type="text" 
                                name="email" 
                                id="email" 
                                placeholder="john.doe@company.com"
                                required
                                className='input'
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </label>
                    </div>

                    <div className="flex gap-6">

                        <label htmlFor="password" className='flex flex-col title-sm uppercase text-indigo-900'>
                            Password
                            <input 
                                type="password" 
                                name="password" 
                                id="password" 
                                className='input'
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </label>

                        <label htmlFor="user_type" className='flex flex-col title-sm uppercase text-indigo-900'>
                            User Type
                            <select 
                                name="user_type" // Changed to match the state
                                id="user_type" 
                                className='input'
                                value={formData.user_type}
                                onChange={handleChange}
                            >
                                <option value="patient">Patient</option>
                                <option value="doctor">Doctor</option>
                                <option value="admin">Admin</option>
                            </select>
                        </label>
                    </div>

                    <div className='btn-book-online h-12 md:h-[3.6rem] base:h-[3.8rem] lg:h-[3.4rem] px-8 md:px-10 
                        base:px-6 text-[1rem] md:text-[1.3rem] base:text-[1.38rem] lg:text-[1.4rem] xl:text-[1.2rem] 
                        3xl:text-[1.5rem] z-[40] btn-book-online flex w-[24vw] justify-center rounded-sm'>
                        <Button 
                            text={'Register'}
                            aria={'Click to register your account'}
                            isSubmit={true}
                        />
                    </div>
                    
                </form>

                <div className="flex justify-center items-center mt-6 text-indigo-900">
                    <p>Already have an account?</p>
                    <p className='ml-2 underline underline-offset-2'>
                        <a href="/login">Click here to login</a>
                    </p>
                </div>
            </article>

        </section>
    );
}

export default Register;
