import React from 'react'
import Level from './Level.js'

export default ({ world, levels, levelProgress, startLevel }) => {
  return (
    <div className={'world-container world-' + world}>
      <div className='level-container'>
        {levels.map((level, i) => {
          return (
            <Level
              startLevel={startLevel}
              key={i}
              world={world}
              levelProgress={levelProgress}
              {...level}
            />
          )
        })}
      </div>
    </div>
  )
}
