import React from 'react'
import Lines from '../Components/Lines.js'
import TextContainer from '../Components/TextContainer.js'
import Wrapper from '../Components/Wrapper.js'
import WeatherShard from '../../Level/WeatherShard.js'
import TutorialBoard from '../Components/TutorialBoard.js'
import { all } from '../../../constants/probabilities.js'
import { auto, delay } from '../../../constants/tutorialDefaults.js'

const textContent = [
  { text: 'The rain will fall for 2 turns',
    className: 'plus-1-5 white',
    visibleAt: [ 4 ]
  }
]

export const sequence2 = {
  substeps: [
    { delay, auto },
    { delay: 3000 },
    { delay: 3000, auto },
    { delay: 1500, auto },
    { delay, auto }
  ],
  board: { size: 4, probabilities: all.rain, substep: 1 },
  weather: { action: 'threshold', threshold: 24, substep: 1 }
}


export default class Step2 extends React.PureComponent {

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
          visibleAt={[ 2, 3, 4, 5 ]}
          className='transition-500'
          {...this.props}
        >
          <WeatherShard
            type={'rain w40 minus-4-0-margin ' + handleAwakenedShard}
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
      </TextContainer>
    )
  }
}
