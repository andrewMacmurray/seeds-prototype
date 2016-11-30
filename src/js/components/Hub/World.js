import React from 'react'
import Level from './Level.js'

export default (props) => {
  const { world, levels, currentLevel } = props
  return (
    <div className={'world-container world-' + world}>
      {levels.map((row) => {
        return (
          <div className='level-row'>
            {row.map(level => {
              return (
                <Level
                  world={world}
                  currentLevel={currentLevel}
                  {...level}
                />
              )
            })}
          </div>
        )
      })}
    </div>
  )
}
