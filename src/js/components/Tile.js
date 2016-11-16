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
      x,
      y,
      isGrowing,
      isLeaving,
      isDragging,
      isEntering,
      isFalling
    } = this.props
    const seedType = tileType === 'pod' ? '' : false
    const containerClasses = classNames(
      'tile-container',
      'x-' + x,
      'y-' + y
    )
    const tileClasses = classNames(
      tileType,
      seedType,
      isGrowing,
      'tile',
      isLeaving,
      isDragging,
      isEntering,
      isFalling
    )
    return (
      <div
        ref={(x) => this.container = x}
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
