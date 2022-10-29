import React from 'react'
  
export const LevelProgress = ({progress, points, level }) => {
     
    const Parentdiv = {
        height: '18px',
        width: '100%',
        backgroundColor: 'whitesmoke',
        borderRadius: 5,
      }
      
      const Childdiv = {
        height: '100%',
        width: `${progress}%`,
        borderRadius: 5,
        textAlign: 'right'
      }
      
      const progresstext = {
        padding: 10,
        color: 'black',
        fontWeight: 900
      }
        
    return (
    <div className='flex flex-col'>
      <div className='flex items-end'>
        <h2>{`${points}`}</h2>
        <h3 className="gradientText font-title text-2xl pl-2 pb-1">MLP</h3>
      </div>
      <div style={Parentdiv}>
        <div style={Childdiv} className="progressbar">
          <span style={progresstext}></span>
        </div>
      </div>
      <div className='flex ml-auto mr-0'>
        <h2 className="gradientText font-title text-xl">LVL</h2>
        <h2 className='pl-2 font-title text-xl'>{`${level}`}</h2>
      </div>
    </div>

    )
}