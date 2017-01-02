import React from 'react'
import TwinSeed from './Seeds/TwinSeed.js'
import CircleSeed from './Seeds/CircleSeed.js'
import classnames from 'classnames'
import { cond, always, gt, lte } from 'ramda'

const backgroundClass = cond([
  [ gt(0.45),   always('sun-shining') ],
  [ lte(0.45),  always('rain-falling') ],
  [ () => true, always('blank') ]
])

const seedMap = {
  sunflower: <TwinSeed />,
  foxglove:  <CircleSeed />
} ||         <TwinSeed />

export default ({ background, seedType, className }) => {

  const loadingClasses = classnames(
    'loading-screen',
    backgroundClass(background),
    className
  )

  return (
    <div className={loadingClasses}>
      <div className={'loading-icon ' + className}>
        {seedMap[seedType]}
      </div>
    </div>
  )
}
