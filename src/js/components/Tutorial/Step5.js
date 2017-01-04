import React from 'react'
import TutorialBoard from './components/TutorialBoard.js'
import TextContainer from './components/TextContainer.js'
import Next from './components/Next.js'
import Lines from './components/Lines.js'

const textContent = [
  { text: 'Now connect the seeds to fill the seed bank',
    visibleAt: [ 1, 2 ]
  },
  { text: 'Connect as many seeds as you can in one go',
    visibleAt: [ 4 ]
  },
  { text: 'Marvelous!',
    visibleAt: [ 5 ]
  },
  { text: 'The more seeds you connect, the faster the seed bank will fill up',
    visibleAt: [ 7 ]
  },
  { text: 'Your first journey awaits...',
    visibleAt: [ 9, 10 ]
  }
]

export default class Step4 extends React.PureComponent {

  componentDidMount () {
    this.checkBoardComplete()
  }

  checkBoardComplete = () => {
    const { podBoardComplete, subStep, step } = this.props
    const handleNext =
         podBoardComplete
      && step === 5
      && (subStep === 4 || subStep === 5)

    setTimeout(() =>
      handleNext
        ? this.props.handleNextTutorialStep()
        : this.checkBoardComplete()
    , 300)
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
          visibleAt={[ 1, 2, 3, 4, 5, 6, 7 ]}
          enabledAt={[ 2, 3, 4 ]}
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
