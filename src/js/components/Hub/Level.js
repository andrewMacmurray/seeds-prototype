import React from 'react'
import ReactDOM from 'react-dom'

export default class Level extends React.PureComponent {
  componentDidMount () {
    const { levelNumber, levelProgress } = this.props
    const $el = ReactDOM.findDOMNode(this.level)
    if (levelNumber === levelProgress) {
      const windowHeight = window.innerHeight
      setTimeout(() => window.scrollBy(0, $el.offsetTop - windowHeight / 2), 300)
    }
  }

  render () {
    const {
      offset: { x: levelX, y: levelY },
      trail: {
        mirror,
        img: trailImg,
        rotate: trailRotate,
        offset: { x: trailX, y: trailY }
      },
      levelNumber,
      levelProgress,
      avatars,
      world,
      startLevel,
      goal
    } = this.props

    const isComplete = levelProgress > levelNumber
    const isCurrentLevel = levelProgress === levelNumber

    const numberActiveClass = isComplete || isCurrentLevel
      ? 'active'
      : ''

    const levelAvatar = isComplete
      ? `img/seeds/${avatars[0]}/${avatars[0]}.svg`
      : 'img/outlines/teardrop-seed-outline.svg'

    const trailScale = mirror ? -1 : 1
    const trailStyles = {
      transform:
       `translate(${trailX}em, ${trailY}em)
        scaleX(${trailScale})
        rotate(${trailRotate}deg)`
    }
    const renderTrail = isComplete
      ? <img className='trail'
        style={trailStyles}
        src={`img/trails/${trailImg}`}
        />
      : ''

    const renderPointer = isCurrentLevel
      ? <img className='pointer' src='img/triangle.svg' />
      : ''

    return (
      <div
        ref={($el) => this.level = $el}
        className={'level offset-x-' + levelX + ' offset-y-' + levelY}
        onClick={() => startLevel(levelNumber, goal, levelProgress, avatars)}
      >
        {renderTrail}
        {renderPointer}
        <img className='level-avatar' src={levelAvatar} />
        <div className={'level-number ' + numberActiveClass + ' world-' + world}>
          <p>{levelNumber}</p>
        </div>
      </div>
    )
  }
}
