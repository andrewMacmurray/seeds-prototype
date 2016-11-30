import React from 'react'

export default (props) => {
  const { offset, levelNumber, currentLevel, avatars, world } = props

  const isActive = currentLevel >= levelNumber
  const activeClass = isActive ? 'active' : ''
  const levelAvatar = isActive ? `img/${avatars[0]}.svg` : 'img/seed-outline.svg'

  return (
    <div className={'level offset-' + offset}>
      <img src={levelAvatar} />
      <div className={'level-number ' + activeClass + ' world-' + world}>
        <p>{levelNumber}</p>
      </div>
    </div>
  )
}
