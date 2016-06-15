import React from 'react'
import ReactDOM from 'react-dom'
import { addListener, removeListener } from 'spur-events'
import classNames from 'classnames'

export default class Seed extends React.Component {
  componentDidMount () {
    const el = ReactDOM.findDOMNode(this)
    addListener(el, 'pointerenter', (e) => this.props.checkTile(e))
    addListener(el, 'pointerdown', (e) => this.props.startDrag(e))
  }

  componentWillUnmount () {
    const el = ReactDOM.findDOMNode(this)
    removeListener(el, 'pointerenter', (e) => this.props.checkTile(e))
    removeListener(el, 'pointerdown', (e) => this.props.startDrag(e))
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
        data-x={this.props.x}
        data-y={this.props.y}
      >
      </div>
    )
  }
}
