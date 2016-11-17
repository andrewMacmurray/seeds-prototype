import React from 'react'

export default (props) => {
  const screenHeight = props.score * 0.2
  return (
    <div className='seed-bank' onClick={props.harvestSeeds}>
      <div
        className={'screen ' + props.backdrop}
        style={{ transform: `translateY(${-screenHeight}px)` }}
      />
      <img className='outline' src='img/seed-outline.svg' />
      <img src='img/seed.svg'/>
    </div>
  )
}
