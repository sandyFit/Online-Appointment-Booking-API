import React, { useState } from 'react';
import Logo from './Logo';
import { AiOutlineHome, AiOutlineCalendar, AiOutlineUser, AiOutlineLogout, AiOutlineClose } from "react-icons/ai";
import { IoNotificationsOutline } from "react-icons/io5";
import { MdOutlineSwitchAccount } from "react-icons/md";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Dashboard = ({ children }) => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const { user } = useSelector(state => state.user); // Access user info from redux
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear(); // Clear token and user data
        navigate('/login'); // Navigate to login page
    };

    // Define menu items for different user types
    const userItems = [
        { to: '/', icon: <AiOutlineHome className='text-[1.3rem]' />, label: 'Home' },
        { to: '/appointments', icon: <AiOutlineCalendar className='text-[1.3rem]' />, label: 'Appointments' },
        { to: '/apply-doctor', icon: <MdOutlineSwitchAccount className='text-[1.3rem]' />, label: 'Apply Doctor' },
        { to: '/doc-profile', icon: <AiOutlineUser className='text-[1.3rem]' />, label: 'Profile' },
    ];

    const adminItems = [
        { to: '/', icon: <AiOutlineHome className='text-[1.3rem]' />, label: 'Admin Home' },
        { to: '/users', icon: <AiOutlineUser className='text-[1.3rem]' />, label: 'Manage Users' },
        { to: '/doctors', icon: <MdOutlineSwitchAccount className='text-[1.3rem]' />, label: 'Manage Doctors' },
        { to: '/admin-profile', icon: <AiOutlineUser className='text-[1.3rem]' />, label: 'Admin Profile' },
    ];

    // Render the correct menu based on user type
    const menuToBeRendered = user?.user_type === 'admin' ? adminItems : userItems;

    const renderMenuItem = ({ to, icon, label }) => (
        <Link to={to} key={label}
            className={`${isCollapsed ? 'dash-links-collapsed justify-center' : 'dash-links'}`}>
            {icon}
            <span className={`${isCollapsed ? 'hidden' : 'visible'}`}>{label}</span>
        </Link>
    );

    return (
        <section className="w-full h-screen flex justify-center items-center">
            <div className="w-full h-full grid grid-cols-12 grid-rows-6 gap-4 p-8">
                {/* Sidebar */}
                <aside className={`${isCollapsed ? 'collapsed-sidebar' : 'sidebar'}`}>
                    {isCollapsed ? <div className="font-anybody text-[3rem]">RD</div> : <Logo />}
                    <ul className={`w-full flex flex-col gap-3 pt-20 
                        ${isCollapsed ? 'justify-center items-center' : ''}`}>
                        {menuToBeRendered.map(renderMenuItem)} {/* Conditionally rendered menu */}
                    </ul>

                    {/* Logout */}
                    <div className={`${isCollapsed ? 'dash-links-collapsed justify-center' : 'dash-links'} mt-3`}
                        onClick={handleLogout}>
                        <AiOutlineLogout className='text-[1.3rem]' />
                        <span className={`${isCollapsed ? 'hidden' : 'visible'} whitespace-nowrap`}>Logout</span>
                    </div>
                </aside>

                {/* Header */}
                <header className={`glass row-span-1 rounded-[12px] flex justify-between items-center px-6 
                    ${isCollapsed ? 'col-span-11 col-start-2' : 'col-span-9 col-start-4'}`}>
                    <button onClick={() => setIsCollapsed(!isCollapsed)} className="frame">
                        {isCollapsed ? <RxHamburgerMenu className="text-[1.5rem]" /> :
                            <AiOutlineClose className="text-[1.5rem]" />}
                    </button>
                    <div className="flex justify-center items-center gap-6 relative">
                        {/* Notifications */}
                        <div className="frame relative">
                            <div className="absolute bottom-7 left-7 h-6 w-6 bg-red-500 rounded-full flex 
                                justify-center items-center text-zinc-100">
                                3
                            </div>
                            <IoNotificationsOutline className="text-[1.6rem]" />
                        </div>

                        {/* User Info */}
                        <div className="flex gap-2 items-center">
                            <div className="w-12 h-12 border-4 border-indigo-500 rounded-full"></div>
                            <div className="flex flex-col">
                                <h3 className="text-[.9rem]">{user?.username}</h3>
                                <p className="text-[.7rem]">{user?.user_type || "User"}</p> {/* Render user title or default to 'User' */}
                            </div>
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <main className={`glass row-span-5 rounded-[12px] 
                    ${isCollapsed ? 'col-span-11 col-start-2' : 'col-span-9 col-start-4'}`}>
                    {children}
                </main>
            </div>
        </section>
    );
};

export default Dashboard;
