import React, { useState } from 'react'
import Dashboard from '../components/ui/Dashboard';
import { Button } from "antd";

const RegisterPatient = () => {

    const [selectedAppointment, setSelectedAppointment] = useState('');
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        phone: '',
        email: '',
        visit_type: '',
        date_of_birth: '',
        treatment: ''
    });
    
    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }))
    }

    const handleAppointmentChange = (e) => {
        setSelectedAppointment(e.target.value);
    }

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
                            htmlFor="first_name" className='title-xsm text-indigo-900 flex flex-col uppercase'>
                            First Name
                            <input type="text"
                                name='first_name'
                                id='first_name'
                                placeholder='Enter your first name'
                                required
                                className='input w-[20vw]'
                                value={formData.first_name}
                                onChange={handleChange}
                            />
                        </label>
                        <label 
                            htmlFor="last_name" className='title-xsm text-indigo-900 flex flex-col uppercase'>
                            Last Name
                            <input type="text"
                                name='last_name'
                                id='last_name'
                                placeholder='Enter your last name'
                                required
                                className='input w-[20vw]'
                                value={formData.last_name}
                                onChange={handleChange}
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
                                value={formData.phone}
                                onChange={handleChange}
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
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </label>

                        <label 
                            htmlFor="visit_type" className='title-xsm text-indigo-900 flex flex-col uppercase'>
                            Type of Appointment
                            <select id="appointment"
                                className="input w-[20vw]"
                                value={selectedAppointment} // Using the state
                                onChange={handleAppointmentChange} // Update the state based on user selection
                            >
                                <option value="">Select an Appointment</option>
                                <option value="first">First visit</option>
                                <option value="follow-up">Follow up visit</option>
                                <option value="emergency">Emergency</option>
                            </select>
                        </label>

                        <label 
                            htmlFor="date_of_birth" className='title-xsm text-indigo-900 flex flex-col uppercase'>
                            Date of Birth
                            <input type="text"
                                name='date_of_birth'
                                id='date_of_birth'                                
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
                                value={formData.treatment}
                                onChange={handleChange}
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
    )
}

export default RegisterPatient;
