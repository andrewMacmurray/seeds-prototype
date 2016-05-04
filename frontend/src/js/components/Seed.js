import React from 'react'

export default (props) => (
  <div
    className={props.tileType + ' tile ' + props.isLeavingBool + ' x-' + props.x + ' y-' + props.y + ' ' + props.isDraggingBool + ' ' + props.isFalling}
    id={props.id}
    onClick={props.handleClick}
    onMouseDown={props.startDrag}
    onMouseEnter={props.checkTile}
    draggable={false}
    data-x={props.x}
    data-y={props.y}>
  </div>
)
