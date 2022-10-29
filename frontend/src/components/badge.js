import React from 'react'

const Badge = ({ text, classes: color }) => {
    return (
        <>
            <div className='w-14 h-[4.7rem] mx-[0.45rem] my-2 text-center'>
                <div className='h-14 bg-background rounded-full'>

                </div>
                <p className='font-fire text-s'>{text}</p>
            </div>
        </>
    )
}

export default Badge
