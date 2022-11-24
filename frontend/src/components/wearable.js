import React from 'react'

export const Wearable = ({ name, url, title ,image_class , onClick, clicked }) => {
    return (

        <div
        key={url} 
            onClick={onClick ? () => onClick() : () => { }}
            className={`flex flex-col bg-[#262626] relative text-center mx-1 mb-6  items-center justify-center space-y-1 sm:space-y-2 lg:w-35 xl:w-40 lg:h-35 xl:h-40 rounded ${onClick ? "cursor-pointer" : "cursor-default"} hover:scale-105 transition duration-200 ease-linear ${clicked ? "border-opacity-30" : "border-opacity-5"}`}
        >
            <img alt={title} src={url}  className={image_class} />
        </div>
    )
}