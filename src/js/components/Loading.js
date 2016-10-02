import React from 'react'
import TwinSeed from './Seeds/TwinSeed.js'

const backgroundClass = (x) => x > 0.45 ? 'sun-shining' : 'rain-falling'

export default ({ background }) => {
  return (
    <div className={'loading-screen ' + backgroundClass(background)}>
      <div className='loading-icon'>
        <TwinSeed />
      </div>
    </div>
  )
}
