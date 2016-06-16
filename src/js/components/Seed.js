import React from 'react'
import ReactDOM from 'react-dom'
import { addListener, removeListener } from 'spur-events'
import classNames from 'classnames'

export default class Seed extends React.Component {
  componentDidMount () {
    const el = ReactDOM.findDOMNode(this.container)
    addListener(el, 'pointerenter', (e) => this.props.checkTile(e))
    addListener(el, 'pointerdown', (e) => this.props.startDrag(e))
  }

  componentWillUnmount () {
    const el = ReactDOM.findDOMNode(this.container)
    removeListener(el, 'pointerenter', (e) => this.props.checkTile(e))
    removeListener(el, 'pointerdown', (e) => this.props.startDrag(e))
  }

  render () {
    const {
      tileType,
      x,
      y,
      isGrowingBool,
      isLeavingBool,
      isDraggingBool,
      isFalling
    } = this.props
    const seedType = tileType === 'pod' ? '' : false
    const containerClasses = classNames(
      'tile-container',
      'x-' + x,
      'y-' + y
    )
    const seedClasses = classNames(
      tileType,
      seedType,
      isGrowingBool,
      'tile',
      isLeavingBool,
      isDraggingBool,
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
        <div className={seedClasses}></div>
      </div>
    )
  }
}
