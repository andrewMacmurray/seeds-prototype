import React from 'react'
import Lines from '../Components/Lines.js'
import Next from '../Components/Next.js'
import TextContainer from '../Components/TextContainer.js'
import { auto, delay } from '../../../constants/tutorialDefaults.js'

const textContent = [
  { text: 'The rains have stopped',
    visibleAt: [ 2, 3 ]
  }
]

export const sequence1 = {
  substeps: [
    { delay, auto },
    { delay, auto },
    { delay }
  ]
}

export default (props) => {
  return (
    <TextContainer {...props}>
      <Lines
        textContent={textContent}
        sameLine
        {...props}
      />
      <Next
        visibleAt={[ 3 ]}
        {...props}
      />
    </TextContainer>
  )
}
