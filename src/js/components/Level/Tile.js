import React from 'react'
import ReactDOM from 'react-dom'
import classNames from 'classnames'
import { addListener, removeListener } from 'spur-events'
import { cond, equals, always, or, and, T, identity } from 'ramda'

export default class Seed extends React.PureComponent {
  componentDidMount () {
    const $el = this.getContainer()
    const { offsetWidth, offsetHeight } = $el
    const { x: originX, y: originY } = this.props

    addListener($el, 'pointerdown', this.props.startDrag)

    if (!window.PointerEvent) {
      addListener($el, 'pointerenter', (e) => {
        e.preventDefault()
        const dataX = parseInt(e.target.getAttribute('data-x'))
        const dataY = parseInt(e.target.getAttribute('data-y'))
        this.props.checkTile([ dataY, dataX ])
      })
    }

    $el.addEventListener('pointermove', (e) => {
      e.preventDefault()
      this.props.checkTile([
        Math.round((e.offsetX - offsetWidth / 2) / offsetWidth) + originY,
        Math.round((e.offsetY - offsetHeight / 2) / offsetHeight) + originX
      ])
    })
  }

  componentWillUnmount () {
    const $el = this.getContainer()
    removeListener($el, 'pointerdown')
    removeListener($el, 'pointerenter')
  }

  getContainer () {
    return ReactDOM.findDOMNode(this.container)
  }

  render () {
    const {
      tileType,
      seedType,
      x,
      y,
      overridePower,
      weatherAnimating,
      remainingWeatherTurns,
      moveOrder,
      growingOrder,
      isGrowing,
      isLeaving,
      isDragging,
      isEntering,
      isFalling,
      rainDirection,
      sunDirection,
      seedDirection
    } = this.props

    const seedClass = tileType === 'seed' || tileType === 'seedPod'
      ? seedType
      : ''

    const growingTransition = weatherAnimating ? ' transition' : ''

    const fullPower = or(remainingWeatherTurns > 0, overridePower)

    const growingClass = cond([
      [ and(fullPower), always('growing ' + growingTransition) ],
      [ identity,       always('bulging') ],
      [ T,              always('') ]
    ])

    const leavingAlignment = cond([
      [ equals('rain'), always('leaving ' + rainDirection) ],
      [ equals('sun'),  always('leaving ' + sunDirection) ],
      [ equals('seed'), always('leaving ' + seedDirection) ]
    ])

    const leavingClasses = isLeaving
      ? leavingAlignment(tileType)
      : ''

    const containerClasses = classNames(
      'tile-container',
      'x-' + x,
      'y-' + y
    )

    const tileClasses = classNames(
      'tile',
      tileType,
      seedClass,
      growingClass(isGrowing),
      moveOrder,
      growingOrder,
      leavingClasses,
      isDragging,
      isEntering,
      isFalling
    )

    return (
      <div
        ref={($el) => this.container = $el}
        className={containerClasses}
        data-x={x}
        data-y={y}
        data-type={tileType}
      >
        <div className={tileClasses}></div>
      </div>
    )
  }
}
