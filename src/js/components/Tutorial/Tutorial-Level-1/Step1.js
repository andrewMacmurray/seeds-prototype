import React from 'react'
import TutorialBoard from '../Components/TutorialBoard.js'
import TextContainer from '../Components/TextContainer.js'
import Lines from '../Components/Lines.js'
import { all } from '../../../constants/probabilities.js'
import { auto, delay } from '../../../constants/tutorialDefaults.js'

const textContent = [
  { text: 'Grow seed-pods in the rain',
    visibleAt: [ 3, 4, 5 ]
  }
]

export const sequence1 = {
  substeps: [
    { delay: 2500, auto },
    { delay: 1500, auto },
    { delay: 1000, auto },
    { delay: 2000 }
  ],
  board: { size: 3, probabilities: all.seedPods, substep: 1 },
  weather: { action: 'start', type: 'rain', substep: 1 }
}

export default class Step1 extends React.PureComponent {

  componentDidMount () {
    const { checkBoardComplete, renderStep } = this.props
    checkBoardComplete({
      boardType: 'seedPodBoardComplete',
      renderStep,
      completeStep: 4
    })
  }

  render () {
    return (
      <TextContainer {...this.props}>
        <Lines
          textContent={textContent}
          sameLine
          {...this.props}
        />
        <TutorialBoard
          seedDirection='top'
          visibleAt={[ 4, 5 ]}
          enabledAt={[ 4 ]}
          {...this.props}
        />
      </TextContainer>
    )
  }
}
