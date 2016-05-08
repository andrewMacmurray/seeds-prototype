import React from 'react'
import classNames from 'classnames'
import TwinSeed from './Seeds/TwinSeed.js'

export default (props) => {
  const classes = classNames(
    'tile',
    props.tileType,
    props.isLeavingBool,
    'x-' + props.x,
    'y-' + props.y,
    props.isDraggingBool,
    props.isFalling
  )
  return (
    <div
      className={classes}
      id={props.id}
      onClick={props.handleClick}
      onMouseDown={props.startDrag}
      onMouseEnter={props.checkTile}
      draggable={false}
      data-x={props.x}
      data-y={props.y}>
    </div>
  )
}
