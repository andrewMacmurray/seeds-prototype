import React from 'react'
import TwinSeed from './Seeds/TwinSeed.js'
import CircleSeed from './Seeds/CircleSeed.js'
import classnames from 'classnames'

const backgroundClass = (x) => x > 0.45 ? 'sun-shining' : 'rain-falling'

const seedMap = {
  sunflower: <TwinSeed />,
  foxglove: <CircleSeed />
} || <TwinSeed />

export default ({ background, seedType, className }) => {

  const loadingClasses = classnames(
    'loading-screen',
    backgroundClass(background),
    className
  )

  return (
    <div className={loadingClasses}>
      <div className='loading-icon'>
        {seedMap[seedType]}
      </div>
    </div>
  )
}
