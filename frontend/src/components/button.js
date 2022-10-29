import React from 'react'

const Button = ({ text, link, classes }) => {
    return (
        <a href={link} className={`${classes} relative w-30 flex sm:scale-85 lg:scale-90 xl:scale-100 cursor-pointer font-medium text-xl rounded-lg py-2 px-3 items-end`}>
            <div className=' border-solid  border-2 rounded-[15px] px-2 border-white'>
                <h2 className='text-[15px]'>{text}</h2>    
            </div>
            
        </a>
    )
}

export default Button
