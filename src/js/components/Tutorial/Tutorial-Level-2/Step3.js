import React from 'react'
import Lines from '../Components/Lines.js'
import Next from '../Components/Next.js'
import TextContainer from '../Components/TextContainer.js'
import Wrapper from '../Components/Wrapper.js'
import WeatherShard from '../../Level/WeatherShard.js'
import TutorialBoard from '../Components/TutorialBoard.js'
import { all } from '../../../constants/probabilities.js'
import { auto, delay } from '../../../constants/tutorialDefaults.js'

const textContent = [
  { text: 'You reawakened the neptune shard!',
    className: 'plus-1-5 white',
    visibleAt: [ 4, 5, 6 ]
  },
  { text: 'The rain will fall for 2 turns',
    className: 'plus-3-5 white',
    visibleAt: [ 5, 6 ]
  }
]

export const sequence3 = {
  substeps: [
    { delay, auto },
    { delay: 2000 },
    { delay: 2000, auto },
    { delay, auto },
    { delay, auto },
    { delay }
  ],
  board: { size: 4, probabilities: all.rain, substep: 1 },
  weather: { action: 'threshold', threshold: 24, substep: 1 }
}


export default class Step3 extends React.PureComponent {

  componentDidMount () {
    const { renderStep, checkBoardComplete } = this.props
    checkBoardComplete({
      boardType: 'rainBoardComplete',
      renderStep,
      completeStep: 2
    })
  }

  render () {
    const { rainBoardComplete, rain } = this.props
    const handleAwakenedShard = !rainBoardComplete
      ? 'dormant'
      : ''

    return (
      <TextContainer {...this.props}>
        <Wrapper
          visibleAt={[ 2, 3, 4, 5, 6 ]}
          className='transition-500'
          {...this.props}
        >
          <WeatherShard
            type={'rain w45 minus-4-0-margin ' + handleAwakenedShard}
            power={rain}
            weatherVisible={rainBoardComplete}
            threshold={this.props.threshold}
          />
        </Wrapper>
        <Lines
          textContent={textContent}
          sameLine
          {...this.props}
        />
        <TutorialBoard
          rainDirection='top'
          visibleAt={[ 2 ]}
          enabledAt={[ 2 ]}
          {...this.props}
        />
        <Next
          className='white'
          visibleAt={[ 6 ]}
          {...this.props}
        />
      </TextContainer>
    )
  }
}
