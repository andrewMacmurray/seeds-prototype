import React from 'react'
import Step1 from './Step1.js'
import Step2 from './Step2.js'

export default (props) => {
  return (
    <div className='tutorial-container'>
      <Step1 {...props} renderStep={1} />
      <Step2 {...props} renderStep={2} />
    </div>
  )
}
