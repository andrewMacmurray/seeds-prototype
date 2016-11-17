import React from 'react'

export default (props) => {
  const screenHeight = props.score * 0.2
  return (
    <div className='seed-bank' onClick={props.harvestSeeds}>
      <div className='screen' style={{ transform: `translateY(${-screenHeight}px)` }} />
      <img src='img/seed-dark.png'/>
    </div>
  )
}
