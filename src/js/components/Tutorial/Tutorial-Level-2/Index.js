import React from 'react'
import Step1 from './Step1.js'
import Step2 from './Step2.js'
import Step3 from './Step3.js'

export default (props) => {
  return (
    <div className='tutorial-container'>
      <Step1 {...props} renderStep={1} />
      <Step2 {...props} renderStep={2} />
      <Step3 {...props} renderStep={3} />
    </div>
  )
}
