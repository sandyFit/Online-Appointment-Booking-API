import React from 'react'

const Links = ({href, text}) => {
    return (
        <a href={href}
            target="_blank"
            rel="noopener noreferrer"
            className='ml-1 font-[700] app-title-light relative after:absolute after:bottom-0 
            after:left-0 after:right-0 after:h-[1px] after:w-full after:origin-bottom after:scale-x-0 
            after:bg-indigo-300 after:transition-transform after:duration-300 
            after:ease-[cubic-bezier(0.65_0.05_0.36_1)] hover:after:origin-bottom'> 
            {text}                
        </a>
    )
}

export default Links