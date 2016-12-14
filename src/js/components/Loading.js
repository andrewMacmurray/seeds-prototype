import React from 'react'
import TwinSeed from './Seeds/TwinSeed.js'
import CircleSeed from './Seeds/CircleSeed.js'

const backgroundClass = (x) => x > 0.45 ? 'sun-shining' : 'rain-falling'

const seedMap = {
  sunflower: <TwinSeed />,
  foxglove: <CircleSeed />
} || <TwinSeed />

export default ({ background, seedType }) => {
  return (
    <div className={'loading-screen ' + backgroundClass(background)}>
      <div className='loading-icon'>
        {seedMap[seedType]}
      </div>
    </div>
  )
}
