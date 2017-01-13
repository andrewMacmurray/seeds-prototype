import React from 'react'
import ReactDOM from 'react-dom'
import classNames from 'classnames'
import { Observable } from 'rxjs'

export default class Seed extends React.PureComponent {
  componentDidMount () {
    const $el = this.getContainer()
    const { offsetWidth, offsetHeight } = $el
    const { x: originX, y: originY } = this.props

    const pointer$ = Observable
      .fromEvent($el, 'pointermove')
      .throttleTime(50)
      .map(e => ({
        x: Math.round((e.offsetX - offsetWidth / 2) / offsetWidth) + originY,
        y: Math.round((e.offsetY - offsetHeight / 2) / offsetHeight) + originX
      }))
      .subscribe(console.log)
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
      weatherAnimating,
      moveOrder,
      growingOrder,
      isGrowing,
      isLeaving,
      isDragging,
      isEntering,
      isFalling
    } = this.props

    const seedClass = tileType === 'pod' || tileType === 'seedling'
      ? seedType
      : ''
    const growingTransition = weatherAnimating ? ' transition' : ''

    const growingClass = isGrowing
      ? isGrowing + growingTransition
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
      growingClass,
      moveOrder,
      growingOrder,
      isLeaving,
      isDragging,
      isEntering,
      isFalling
    )

    return (
      <div
        onPointerDown={this.props.startDrag}
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
