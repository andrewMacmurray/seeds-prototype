import React from 'react'
import Level from './Level.js'

export default (props) => {
  const { world, levels, levelProgress } = props
  return (
    <div className={'world-container world-' + world}>
      {levels.map((row, i) => {
        return (
          <div key={i} className='level-row'>
            {row.map((level, j) => {
              return (
                <Level
                  key={j}
                  world={world}
                  levelProgress={levelProgress}
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
