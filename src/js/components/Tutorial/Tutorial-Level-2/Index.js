import React from 'react'
import Step1 from './Step1.js'

export default (props) => {
  return (
    <div className='tutorial-container'>
      <Step1 {...props} renderStep={1} />
    </div>
  )
}
