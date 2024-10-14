import React from 'react'
import Dashboard from '../components/ui/Dashboard';

import { TimePicker } from "antd";
import Button from '../components/buttons/Button';

const RegisterPatient = () => {
    return (
        <Dashboard>
            <h1 className='title-h5 uppercase text-indigo-900 text-center mt-4'>
                Add a new patient
            </h1>
            <hr className='border-t-[1px] border-slate-400' />
            <section className="flex justify-center items-center">
                <form className='flex flex-col gap-6 mt-12'>
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

                        <label 
                            htmlFor="visit_type" className='title-xsm text-indigo-900 flex flex-col uppercase'>
                            Type of Visit
                            <input type="text"
                                name='visit_type'
                                id='visit_type'
                                placeholder='Enter type of visit'
                                required
                                className='input w-[20vw]'
                            />
                        </label>

                        <label 
                            htmlFor="firstName" className='title-xsm text-indigo-900 flex flex-col uppercase'>
                            Date of Birdth
                            <input type="text"
                                name='firstName'
                                id='firstName'
                                placeholder='Enter your specialty'
                                required
                                className='input w-[20vw]'
                            />
                        </label>
                        
                    </div>
                    <div className="flex">
                        <label 
                            htmlFor="treatment" className='title-xsm text-indigo-900 flex flex-col uppercase'>
                            Treatment
                            <input type="text"
                                name='treatment'
                                id='treatment'
                                placeholder="Enter patient's treatment"
                                required
                                className='input w-[20vw]'
                            />
                        </label>
                    </div>
                              

                    <div className="flex justify-end">
                        <div className='btn-book-online h-12 md:h-[3.6rem] base:h-[3.8rem] lg:h-[3.4rem] px-8 md:px-10 
                            base:px-6 text-[1rem] md:text-[1.3rem] base:text-[1.38rem] lg:text-[1.4rem] xl:text-[1.2rem] 
                            z-[40] flex w-[10vw] justify-center rounded-sm mt-3'>
                            <Button 
                                text={'Submit'}
                                aria={'Click to register a new doctor'}
                                isSubmit={true} // Pass as true to indicate this is a submit button
                            />
                        </div>
                    </div>
                    
                </form>

            </section>
        </Dashboard>
    )
}

export default RegisterPatient;
