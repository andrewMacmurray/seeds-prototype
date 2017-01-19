import React from 'react'
import Line from './components/Line.js'
import Next from './components/Next.js'
import TextContainer from './components/TextContainer.js'
import { auto, delay } from '../../constants/tutorialDefaults.js'

const text1 = 'Welcome traveller'

export const sequence1 = {
  substeps: [
    { delay, auto },
    { delay, auto },
    { delay }
  ]
}

export default (props) => {
  return (
    <TextContainer {...props} className='justify-center'>
      <Line
        visibleAt={[ 2, 3 ]}
        text={text1}
        className='minus-1-half-margin'
        {...props}
      />
      <Next
        visibleAt={[ 3 ]}
        {...props}
      />
    </TextContainer>
  )
}
