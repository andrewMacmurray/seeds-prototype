import React from 'react'
import ReactDOM from 'react-dom'
import PointerEvents from 'spur-events'
import classNames from 'classnames'

const addListener = PointerEvents.addListener
const removeListener = PointerEvents.removeListener

export default class Seed extends React.Component {
  componentDidMount () {
    const el = ReactDOM.findDOMNode(this)
    addListener(el, 'pointerenter', this.props.checkTile)
  }

  componentWillUnmount () {
    const el = ReactDOM.findDOMNode(this)
    removeListener(el, 'pointerenter')
  }

  render () {
    const seedType = this.props.tileType === 'pod' ? '' : false
    const classes = classNames(
      this.props.tileType,
      seedType,
      this.props.isGrowingBool,
      'tile',
      this.props.isLeavingBool,
      'x-' + this.props.x,
      'y-' + this.props.y,
      this.props.isDraggingBool,
      this.props.isFalling
    )
    return (
      <div
        className={classes}
        id={this.props.id}
        onMouseDown={this.props.startDrag}
        onTouchStart={this.props.startDrag}
        onMouseEnter={this.props.checkTile}
        data-x={this.props.x}
        data-y={this.props.y}
      >
      </div>
    )
  }
}
