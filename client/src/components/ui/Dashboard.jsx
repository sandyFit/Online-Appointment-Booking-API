import React, { useState } from 'react'
import Logo from './Logo';
import { AiOutlineHome } from "react-icons/ai";
import { AiOutlineCalendar } from "react-icons/ai";
import { AiOutlineUser } from "react-icons/ai";
import { AiOutlineLogout } from "react-icons/ai";
import { IoNotificationsOutline } from "react-icons/io5";
import { MdOutlineSwitchAccount } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link } from 'react-router-dom';

const Dashboard = ({ children }) => {
    
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <section className='w-full h-screen flex justify-center items-center'>
            <div className="w-full h-full grid grid-cols-12 grid-rows-6 gap-4 p-8">
                <aside className={`${isCollapsed ? 'collapsed-sidebar' : 'sidebar'}`}>   
                    {isCollapsed ? (
                        <div className="font-anybody text-[3rem]">RD</div>
                    ) : (
                            <Logo/>
                        )
                    }                  
                                       
                    <ul className={`w-full flex flex-col gap-3 ${isCollapsed ? 'justify-center items-center' : ''}  
                        transition-all duration-300 ease-in-out`}>

                        <Link to={'/'}
                            className={`${isCollapsed ? 'dash-links-collapsed justify-center' : 'dash-links'}`}>
                                <AiOutlineHome className='text-[1.5rem]' /> 
                                <span className={`${isCollapsed ? 'hidden' : 'visible'}`}>Home</span>                            
                        </Link>
                        <Link to={'/appointments'}
                            className={`${isCollapsed ? 'dash-links-collapsed justify-center' : 'dash-links'}`}>
                                <AiOutlineCalendar className='text-[1.5rem]' /> 
                                <span className={`${isCollapsed ? 'hidden' : 'visible'}`}>Appointments</span>                           
                        </Link>
                        <Link to={'/apply-doctor'}
                            className={`${isCollapsed ? 'dash-links-collapsed justify-center' : 'dash-links'}`}>
                                <MdOutlineSwitchAccount className='text-[1.5rem]' /> 
                                <span className={`${isCollapsed ? 'hidden' : 'visible'}`}>Apply Doctor</span>
                        </Link>
                        <Link to={'/doc-profile'}
                            className={`${isCollapsed ? 'dash-links-collapsed justify-center' : 'dash-links'}`}>
                                <AiOutlineUser className='text-[1.5rem]' /> 
                                <span className={`${isCollapsed ? 'hidden' : 'visible'}`}>Profile</span>
                        </Link>
                        <Link to={'logout'}
                            className={`${isCollapsed ? 'dash-links-collapsed justify-center' : 'dash-links'}`}>
                                <AiOutlineLogout className='text-[1.5rem]' /> 
                                <span className={`${isCollapsed ? 'hidden' : 'visible'}`}>Logout</span>                        
                        </Link>
                    </ul>                    
                </aside>

                <header className={`glass row-span-1 rounded-[12px] flex justify-between items-center px-6
                    ${isCollapsed ? 'col-span-11 col-start-2' : 'col-span-9 col-start-4'}`}>
                    <button onClick={() => setIsCollapsed(!isCollapsed)} className="frame">
                        {isCollapsed ? <RxHamburgerMenu className='text-[1.5rem]' />
                            : <AiOutlineClose className='text-[1.5rem]' />}
                        
                    </button>
                    <div className="flex justify-center items-center gap-6 relative">
                        <div className="frame ">
                            <div className="flex justify-center items-center h-6 w-6 rounded-full bg-red-500
                            absolute bottom-7 left-7 text-zinc-100">3</div>
                            <IoNotificationsOutline className='text-[1.6rem] ' />
                        </div>

                        <div className="flex gap-2 items-center">
                            <div className="flex w-12 h-12 border-4 border-indigo-500 rounded-full "></div>
                            <div className="flex flex-col">
                                <h3 className='text-[.9rem]'>Doctor's Name</h3>
                                <p className='text-[.7rem]'>Doctor's Title</p>
                            </div>
                        </div>
                    </div>
                </header>

                <main className={`glass row-span-5 rounded-[12px] ${isCollapsed ? 'col-span-11 col-start-2'
                    : 'col-span-9 col-start-4'
                }`}>
                    {children}
                </main>

            </div>


        </section>
    )
}

export default Dashboard;
