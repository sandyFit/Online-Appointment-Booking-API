import React from 'react';

const Button = ({ text, aria, isSubmit = false, onClick }) => {
    return (
        <button
            className="group relative overflow-hidden rounded-[8px] uppercase pt-1"
            aria-label={aria} 
            type={isSubmit ? 'submit' : 'button'} // Use isSubmit to determine button type
            onClick={onClick} // Handle click events if provided
        >
            <span className="relative inline-flex overflow-hidden">
                <span className="translate-y-0 transition duration-500 group-hover:-translate-y-[85%] ">
                    {text}
                </span>
                <span className="absolute translate-y-[85%] transition duration-500 group-hover:translate-y-0 ">
                    {text}
                </span>
            </span>
        </button>
    );
}

export default Button;
