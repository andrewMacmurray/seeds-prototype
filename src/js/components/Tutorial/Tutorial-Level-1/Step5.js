import React from 'react'
import TutorialBoard from '../Components/TutorialBoard.js'
import TextContainer from '../Components/TextContainer.js'
import Next from '../Components/Next.js'
import Lines from '../Components/Lines.js'
import { auto, delay } from '../../../constants/tutorialDefaults.js'

const textContent = [
  { text: 'Now connect seeds\n to fill the seed bank',
    className: 'minus-1-5',
    visibleAt: [ 1 ]
  },
  { text: 'Connect as many as you can\n in one move',
    className: 'minus-1-5',
    visibleAt: [ 3 ]
  },
  { text: 'Marvellous!',
    className: 'minus-1-5',
    visibleAt: [ 4 ]
  },
  { text: 'The more seeds you connect,\n the faster the bank will fill up',
    className: 'minus-1-5',
    visibleAt: [ 6 ]
  },
  { text: 'Your first journey awaits...',
    className: 'minus-1-5',
    visibleAt: [ 8, 9, 10 ]
  },
  { text: 'quickly, grow and collect seeds\n whilst it\'s still raining',
    className: 'plus-1-5',
    visibleAt: [ 9, 10 ]
  }
]

export const sequence5 = {
  substeps: [
    { delay, auto },
    { delay, auto },
    { delay: 2000 },
    { delay, auto },
    { delay: 2000, auto },
    { delay, auto },
    { delay, auto },
    { delay, auto },
    { delay, auto },
    { delay: 100 },
    { delay: 100, auto }
  ]
}

export default class Step5 extends React.PureComponent {

  componentDidMount () {
    const { renderStep, checkBoardComplete } = this.props
    checkBoardComplete({
      boardType: 'seedBoardComplete',
      renderStep,
      completeStep: 3
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
          visibleAt={[ 1, 2, 3, 4, 5, 6 ]}
          enabledAt={[ 2, 3 ]}
          {...this.props}
        />
        <Next
          text='begin'
          visibleAt={[ 10 ]}
          {...this.props}
        />
      </TextContainer>
    )
  }
}
