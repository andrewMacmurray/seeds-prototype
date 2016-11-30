import React from 'react'

export default (props) => {
  const { offset, levelNumber, levelProgress, avatars, world } = props

  const isActive = levelProgress >= levelNumber
  const activeClass = isActive ? 'active' : ''
  const levelAvatar = isActive ? `img/${avatars[0]}.svg` : 'img/seed-outline.svg'
  const renderPointer = levelProgress === levelNumber
    ? <img className='pointer' src='img/triangle.svg' />
    : ''

  return (
    <div className={'level offset-' + offset}>
      {renderPointer}
      <img className='level-avatar' src={levelAvatar} />
      <div className={'level-number ' + activeClass + ' world-' + world}>
        <p>{levelNumber}</p>
      </div>
    </div>
  )
}
