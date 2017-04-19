import React from 'react'

const MenuItem = (props, i) => {
  return (
    <p
      key={i}
      className='menu-item'
      onClick={() => props.loadView(props.item)}
    >
      {props.item}
    </p>
  )
}

const Reset = (props) => <p className='menu-item' onClick={props.handleReset}>reset</p>

export default (props) => {
  return (
    <div className={'menu ' + props.menuVisibility}>
      {props.menuOpen ?
        <div>
          {props.menuItems.map((item, i) =>
            <MenuItem item={item} key={i} loadView={props.loadView} />)}
          <Reset {...props} />
        </div>
        : <p className='menu-item' onClick={props.open}>menu</p>
      }
    </div>
  )
}
