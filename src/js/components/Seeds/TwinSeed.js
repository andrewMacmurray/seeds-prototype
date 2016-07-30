import React from 'react'

export default (props) =>
  <svg className={props.seedType}
    data-x={props['data-x']}
    data-y={props['data-y']}
    draggable={false}
    id={props.id}
    onClick={props.handleClick}
    onMouseDown={props.startDrag}
    onMouseEnter={props.checkTile}
    x='0' y='0' width='125' height='194'
    viewBox='0 0 125 194'
  >
    <path
      className='left' fill='#3A2315'
      d='M62 3c0 0-58 80-58 129 0 32 26 58 58 58 0 0 0 0 0 0V4C62 3 62 3 62 3z'
    />
    <path className='right' fill='#A77B52'
      d='M120 132c0-48-54-124-58-128v186C94 190 120 164 120 132z'
    />
  </svg>
