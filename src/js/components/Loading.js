import React from 'react'
import TwinSeed from './Seeds/TwinSeed.js'

export default (props) => {
  const randomBackground = () => Math.random() > 0.45 ? 'rain-falling' : 'sun-shining'
  return (
    <div className={'loading-screen ' + randomBackground()}>
      <div className='loading-icon'>
        <TwinSeed />
      </div>
    </div>
  )
}
