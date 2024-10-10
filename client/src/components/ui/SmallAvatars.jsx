import React from 'react'

const SmallAvatars = ({imgSrc, title, name}) => {
    return (
        <div>
            <div className="flex justify-start items-center w-full gap-4">
                <div className='avatar-sm'>
                    <img src={imgSrc} alt={name} className='avatar-img-sm'/>
                </div>
                <div className="flex flex-col">
                    <h3 className='text-2xl font-semibold '>{name}</h3> 
                    <h4 className='text-slate-500'>{title.toUpperCase()}</h4>
                </div>
            </div>

            <hr className='border-t-2 border-slate-300 w-[100%] my-6'/>

                        
        </div>
    )
}

export default SmallAvatars;
