import React from 'react'
import Line from './Line.js'
import Next from './Next.js'
import TextContainer from './TextContainer.js'

const text1 = 'Welcome traveller'

export default (props) => {
  return (
    <TextContainer {...props} className='justify-center'>
      <Line
        visibleAt={[ 2, 3 ]}
        text={text1}
        {...props}
      />
      <Next
        visibleAt={[ 3, 4 ]}
        {...props}
      />
    </TextContainer>
  )
}
