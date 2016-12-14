import React from 'react'
import ReactDOM from 'react-dom'
import { addListener, removeListener } from 'spur-events'
import classNames from 'classnames'

export default class Seed extends React.PureComponent {
  componentDidMount () {
    const $el = this.getContainer()
    addListener($el, 'pointerenter', this.pointerEnterListener)
    addListener($el, 'pointerdown', this.props.startDrag)
  }

  componentWillUnmount () {
    const $el = this.getContainer()
    removeListener($el, 'pointerenter')
    removeListener($el, 'pointerdown')
  }

  pointerEnterListener = (e) => {
    e.preventDefault()
    this.props.checkTile(e)
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
    const seedClass = tileType === 'pod' || tileType === 'seedling' ? seedType : ''
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
