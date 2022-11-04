import React from 'react'

const Badge = ({ text, src }) => {
    return (

            <div className="w-14 h-[4.7rem] mx-[0.45rem] my-2 text-center" key={src}>
                <img className="h-[4.5rem] w-14" src={src}  alt="badge" />
            </div>
    )
}

export default Badge
