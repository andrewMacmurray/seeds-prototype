import React from 'react'

export default (props) => {
  const { percentComplete } = props
  const height = 80 - 80 * percentComplete
  const setheight = height > 0 ? height : 0
  return (
    <svg className='seed-bank-svg' viewBox='0 0 50 80' xmlns='http://www.w3.org/2000/svg'>
      <defs>
        <path
          d='M25 0S0 34 0 55c0 13.6 11.2 24.7 25 24.7 13.7 0 24.8-11 24.8-24.7 0-20.5-25-55-25-55z'
          id='path-1'
        />
      </defs>
      <mask id='mask-2' fill='#fff'>
        <use xlinkHref='#path-1'/>
      </mask>
      <g mask='url(#mask-2)'>
        <g className='seed-bank-inner' style={`transform:translateY(${setheight}px)`}>
          <path fill='#3A2315' d='M0 .2h26.7V83H0z'/>
          <path fill='#A77B52' d='M26.5.4h26.7V83H26.5z'/>
        </g>
      </g>
    </svg>
  )
}
