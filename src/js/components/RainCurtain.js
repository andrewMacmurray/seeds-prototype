import { times } from 'ramda'
import React from 'react'

export default (props) => {
  const visibility = props.isRaining ? '' : 'hidden'
  return (
    <div className={'rain-curtain ' + visibility}>
      {times((i) => <div key={i} className='rain-drop' />, 16)}
    </div>
  )
}
