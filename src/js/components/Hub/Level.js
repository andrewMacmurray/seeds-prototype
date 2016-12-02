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
    const { offset, levelNumber, levelProgress, avatars, world, startLevel, goal } = this.props

    const isComplete = levelProgress > levelNumber
    const isCurrentLevel = levelProgress === levelNumber

    const numberActiveClass = isComplete || isCurrentLevel
      ? 'active'
      : ''
    const levelAvatar = isComplete ? `img/${avatars[0]}.svg` : 'img/seed-outline.svg'
    const renderPointer = isCurrentLevel
      ? <img className='pointer' src='img/triangle.svg' />
      : ''

    return (
      <div
        ref={($el) => this.level = $el}
        className={'level offset-' + offset}
        onClick={() => startLevel(levelNumber, goal, levelProgress)}
      >
        {renderPointer}
        <img className='level-avatar' src={levelAvatar} />
        <div className={'level-number ' + numberActiveClass + ' world-' + world}>
          <p>{levelNumber}</p>
        </div>
      </div>
    )
  }
}
