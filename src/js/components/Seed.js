import React from 'react'
import classNames from 'classnames'

export default (props) => {
  const seedType = props.tileType === 'pod' ? '' : false
  const classes = classNames(
    props.tileType,
    seedType,
    props.isGrowingBool,
    'tile',
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
      onMouseDown={props.startDrag}
      onTouchStart={props.startDrag}
      onMouseEnter={props.checkTile}
      draggable={false}
      data-x={props.x}
      data-y={props.y}>
    </div>
  )
}
