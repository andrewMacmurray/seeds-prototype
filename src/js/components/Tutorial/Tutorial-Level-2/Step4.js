import React from 'react'
import Lines from '../Components/Lines.js'
import Next from '../Components/Next.js'
import TextContainer from '../Components/TextContainer.js'
import Wrapper from '../Components/Wrapper.js'
import WeatherShard from '../../Level/WeatherShard.js'
import { auto, delay } from '../../../constants/tutorialDefaults.js'

const textContent = [
  { text: 'Ignite the neptune shard,\n with rain spheres',
    className: 'plus-1-5',
    visibleAt: [ 4, 5 ]
  },
  { text: 'grow as many seeds as you can, \n during those two turns',
    className: 'plus-1-5',
    visibleAt: [ 7, 8 ]
  }
]

export const sequence4 = {
  substeps: [
    { delay, auto },
    { delay, auto },
    { delay, auto },
    { delay, auto },
    { delay, auto },
    { delay, auto },
    { delay, auto },
    { delay: 2000 }
  ],
  weather: { action: 'reset', substep: 1 }
}

export default (props) => {
  return (
    <TextContainer {...props}>
      <Wrapper
        visibleAt={[ 1, 2, 3, 4, 5, 6, 7, 8 ]}
        className='transition-500'
        {...props}
      >
        <WeatherShard
          type='rain dormant w40 no-animation minus-4-0-margin'
          power={12}
          threshold={12}
        />
      </Wrapper>
      <Lines
        textContent={textContent}
        sameLine
        {...props}
      />
      <Next
        text='begin'
        visibleAt={[ 8 ]}
        {...props}
      />
    </TextContainer>
  )
}
