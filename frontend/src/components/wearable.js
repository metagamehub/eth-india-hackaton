import React from 'react'

export const Wearable = ({ name, wearable, onClick, clicked }) => {
    return (

        <div 
            onClick={onClick ? () => onClick() : () => { }}
            className={`flex flex-col bg-[#262626] relative text-center m-1 items-center justify-center space-y-1 sm:space-y-2 w-32 md:w-40 h-32 md:h-40 rounded ${onClick ? "cursor-pointer" : "cursor-default"} hover:scale-105 transition duration-200 ease-linear ${clicked ? "border-opacity-30" : "border-opacity-5"}`}
        >
            <img src={`/images/${name}.png`} className={`group-hover:grayscale-0 transition duration-300 ease-in-out object-contain`} />
        </div>
    )
}