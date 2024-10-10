import React from 'react';
import { Link } from 'react-router-dom';

const Logo = () => {
    return (
        <article className='flex space-x-2'>
             <Link to="/" className="flex flex-row items-center space-x-2">
                <div className='flex flex-col'>
                    <span className="text-[1.13rem] md:text-xl lg:text-2xl xl:text-[1.5rem] 2xl:text-[2rem]
                    font-bai uppercase font-bold  tracking-[.3em]
                        base:tracking-[.4em] ">
                        Radiant
                    </span>

                    <div className="w-full flex justify-center items-center">
                        <hr className='hidden xl:block border-[1px] xl:border-[1.5px] border-indigo-900 w-[24.9%] 
                            xl:w-[13.84%] 2xl:w-[28%] '/>
                        <span className='w-full text-[0.71rem] md:text-[0.8rem] base:text-[.92rem] lg:text-[1.1rem] 
                            xl:text-[.80rem] 2xl:text-[1rem] text-right 
                            pr-4 font-[600] uppercase tracking-[.12rem] '>Dental Studio</span>
                    </div>
                </div>
            </Link>
        </article>
    )
}

export default Logo