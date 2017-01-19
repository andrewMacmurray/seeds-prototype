import React from 'react'
import Lines from '../Components/Lines.js'
import Next from '../Components/Next.js'
import TextContainer from '../Components/TextContainer.js'
import Wrapper from '../Components/Wrapper.js'
import WeatherShard from '../../Level/WeatherShard.js'
import { auto, delay } from '../../../constants/tutorialDefaults.js'

const textContent = [
  { text: 'This is a weather shard',
    className: 'plus-3-5',
    visibleAt: [ 2, 3 ]
  },
  { text: 'A fragment sent from the heavens,\n with the power to control the weather',
    className: 'plus-3-5',
    visibleAt: [ 5 ]
  }
]

export const sequence2 = {
  substeps: [
    { delay, auto },
    { delay, auto },
    { delay },
    { delay, auto },
    { delay },
    { delay, auto },
    { delay },
    { delay, auto }
  ]
}

export default (props) => {
  return (
    <TextContainer {...props}>
      <Wrapper
        visibleAt={[ 1, 2, 3, 4, 5, 6 ]}
        className='w40 transition-500'
        {...props}
      >
        <WeatherShard type='' power={12} threshold={12} />
      </Wrapper>
      <Lines
        textContent={textContent}
        sameLine
        {...props}
      />
      <Next
        visibleAt={[ 3, 4, 5, 6, 7 ]}
        {...props}
      />
    </TextContainer>
  )
}
