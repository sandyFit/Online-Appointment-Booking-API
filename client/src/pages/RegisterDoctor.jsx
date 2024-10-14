import React from 'react'
import Dashboard from '../components/ui/Dashboard';

import { TimePicker } from "antd";

const RegisterDoctor = () => {
    return (
        <Dashboard>
            <h1 className='title-h5 uppercase text-indigo-900 text-center'>
                Register a new doctor
            </h1>
            <hr className='border-t-[1px] border-slate-400' />
            <section className="flex justify-center items-center">
                <form className='flex flex-col gap-4 mt-6'>
                    <h2 className='title-sm uppercase text-indigo-900'>
                        Personal Information
                    </h2>
                    <div className="flex gap-8">
                        <label 
                            htmlFor="firstName" className='title-xsm text-indigo-900 flex flex-col uppercase'>
                            First Name
                            <input type="text"
                                name='firstName'
                                id='firstName'
                                placeholder='Enter your first name'
                                required
                                className='input w-[20vw]'
                            />
                        </label>
                        <label 
                            htmlFor="lastName" className='title-xsm text-indigo-900 flex flex-col uppercase'>
                            Last Name
                            <input type="text"
                                name='lastName'
                                id='lastName'
                                placeholder='Enter your last name'
                                required
                                className='input w-[20vw]'
                            />
                        </label>
                        <label 
                            htmlFor="phone" className='title-xsm text-indigo-900 flex flex-col uppercase'>
                            Phone
                            <input type="text"
                                name='phone'
                                id='phone'
                                placeholder='Enter your phone number'
                                required
                                className='input w-[20vw]'
                            />
                        </label>
                    </div>

                    <div className="flex gap-8">
                        <label 
                            htmlFor="email" className='title-xsm text-indigo-900 flex flex-col uppercase'>
                            email
                            <input type="email"
                                name='email'
                                id='email'
                                placeholder='Enter your email address'
                                required
                                className='input w-[20vw]'
                            />
                        </label>
                        
                    </div>

                    <hr className='border-t-[1px] border-slate-400' />

                    <h2 className='title-sm uppercase text-indigo-900 mt-4'>
                        Profesional Information
                    </h2>
                    <div className="flex gap-8">
                        <label 
                            htmlFor="firstName" className='title-xsm text-indigo-900 flex flex-col uppercase'>
                            Specialty
                            <input type="text"
                                name='firstName'
                                id='firstName'
                                placeholder='Enter your specialty'
                                required
                                className='input w-[20vw]'
                            />
                        </label>
                        <label 
                            htmlFor="lastName" className='title-xsm text-indigo-900 flex flex-col uppercase'>
                            Experience
                            <input type="number"
                                name='lastName'
                                id='lastName'
                                placeholder='Enter years of experience'
                                required
                                className='input w-[20vw]'
                            />
                        </label>
                        <label 
                            htmlFor="email" className='title-xsm text-indigo-900 flex flex-col uppercase'>
                            Consultation Times
                            <TimePicker.RangePicker/>
                        </label>
                    </div>
                    
                </form>

            </section>
        </Dashboard>
    )
}

export default RegisterDoctor