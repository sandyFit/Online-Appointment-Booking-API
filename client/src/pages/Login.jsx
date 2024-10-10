import React, {useState} from 'react';
import Button from '../components/buttons/Button';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../redux/alertReducer';

const Login = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        let loaderTimeout;
        e.preventDefault();
        console.log(`Form values being sent: ${JSON.stringify(formData)}`);
        try {
            loaderTimeout = setTimeout(() => {
            dispatch(showLoading());
            }, 300); // Show loader only if it takes longer than 300ms
            const response = await axios.post('http://localhost:5050/users/login', formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            clearTimeout(loaderTimeout);
            dispatch(hideLoading());


            // Check if the response indicates success
            if (response.data.success) {
                console.log(response.data.message);
                toast.success(response.data.message);
                toast('Redirecting to homepage');

                // LOCALSTORAGE
                localStorage.setItem('token', response.data.token);
                navigate('/');
            } else {
                // Specific error handling based on response message
                if (response.data.message === 'User not found') {
                    toast.error('No account found with that email address.');
                } else if (response.data.message === 'Incorrect password') {
                    toast.error('The password you entered is incorrect. Please try again.');
                } else {
                    toast.error('An unknown error occurred. Please try again later.');
                }
            }
        } catch (error) {
            console.error('Error details:', error);
            dispatch(hideLoading());
            toast.error('An error occurred while processing your request. Please try again later.');
        }
    };




    return (
        <section className='h-screen flex items-center justify-center bg-indigo-500'>
            <article className='bg-slate-300 w-[30vw] h-[70vh] rounded-[10px] relative'>
                <div className="w-[18vw] bg-indigo-900 rounded-bl-lg py-2 absolute top-6 -left-6">
                    <h1 className='text-zinc-300 text-[1.6rem] font-[600] text-center'>Welcome Back</h1>
                </div>  
                
                <form onSubmit={handleSubmit} className='flex flex-col justify-center items-center mt-28 gap-6'>
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

                    <div className='btn-book-online h-12 md:h-[3.6rem] base:h-[3.8rem] lg:h-[3.4rem] px-8 md:px-10 
                        base:px-6 text-[1rem] md:text-[1.3rem] base:text-[1.38rem] lg:text-[1.4rem] xl:text-[1.2rem] 
                        3xl:text-[1.5rem] z-[40] btn-book-online flex w-[24vw] justify-center rounded-sm'>
                        <Button 
                            text={'Sign In'}
                            aria={'Click to register your account'}
                            isSubmit={true} // Pass as true to indicate this is a submit button
                        />
                    </div>
                    
                </form>

                <div className="flex justify-center items-center mt-6 text-indigo-900">
                    <p>Don't have an account?</p>
                    <p className='ml-2 underline underline-offset-2'>
                        <a href="/register">Click here to register</a>
                    </p>
                </div>
            </article>
        </section>
    );
}

export default Login;

