import React from 'react'
import Step1 from './Step1.js'
import Step2 from './Step2.js'
import Step3 from './Step3.js'
import Step4 from './Step4.js'
import Step5 from './Step5.js'

export default (props) => {
  return (
    <div className='tutorial-container'>
      <Step1 {...props} renderStep={1} />
      <Step2 {...props} renderStep={2} />
      <Step3 {...props} renderStep={3} />
      <Step4 {...props} renderStep={4} />
      <Step5 {...props} renderStep={5} />
    </div>
  )
}
