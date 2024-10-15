import React from 'react'
import Dashboard from '../components/ui/Dashboard';
import { Table } from "antd";
import { useNavigate } from 'react-router-dom';
import { Button } from "antd";
import { MdOutlineEdit, MdOutlineDeleteForever } from "react-icons/md";
import { FiDelete } from "react-icons/fi";

const dataSource = [
    {
        
        first_name: 'Nathan',
        last_name: 'Roberts',
        phone: '3334445656',
        email: 'drroberts@radiantstudio.com',
        specialty: 'Dental Therapist',
        experience: '12',
        available_hours: "09:00:00-18:00:00"
    },
    {
        
        first_name: 'Sarah',
        last_name: 'Klein',
        phone: '3334445656',
        email: 'sarah@gmail.com',
        visit_type: 'Follow Up',
        date_of_birth: '2002-06-12',
        treatment: 'Teeth Whitening'
    },
];


const columns = [
    {
        title: 'First Name',
        dataIndex: 'first_name',
        key: 'first_name',
    },
    {
        title: 'Last Name',
        dataIndex: 'last_name',
        key: 'last_name',
    },
    {
        title: 'Phone',
        dataIndex: 'phone',
        key: 'phone',
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'Type of visit',
        dataIndex: 'visit_type',
        key: 'visit_type',
    },
    {
        title: 'Date of Birth',
        dataIndex: 'date_of_birth',
        key: 'date_of_birth',
    },
    {
        title: 'Treatment',
        dataIndex: 'treatment',
        key: 'treatment',
    },
    {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
            <div>
                <Button 
                    type="primary" 

                    // onClick={() => handleEdit(record)}
                >
                    <MdOutlineEdit style={{ fontSize: '1.2rem' }} 
/>
                </Button>
                <Button 
                    type="primary"
                    danger={true}
                    // onClick={() => handleDelete(record.id)}
                >
                    <FiDelete style={{ fontSize: '1.2rem' }} 
/>
                </Button>
            </div>
        ),
    },
];


const ManageDoctors = () => {

    const navigate = useNavigate();

    return (
        <Dashboard>
            <div className="flex justify-between items-center my-6">
                <h1 className="title-h5 text-indigo-900">
                    Doctors
                </h1>
                <div className="flex ">
                    <Button
                        type='primary'
                        onClick={() => navigate('/register-doctor')}
                    >
                        Add a new doctor
                    </Button>
                </div>               
            </div>
            
            <Table dataSource={dataSource} columns={columns} />
        </Dashboard>
    )
}

export default ManageDoctors;
