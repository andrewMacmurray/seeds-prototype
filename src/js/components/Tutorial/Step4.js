import React from 'react'
import TutorialBoard from './components/TutorialBoard.js'
import TextContainer from './components/TextContainer.js'
import Lines from './components/Lines.js'

const textContent = [
  { text: 'Seed pods can be connected across or diagonally',
    visibleAt: [ 3 ]
  },
  { text: 'Wonderful!',
    visibleAt: [ 4 ]
  }
]

export default class Step4 extends React.PureComponent {

  componentDidMount () {
    this.checkBoardComplete()
  }

  checkBoardComplete = () => {
    const { seedlingBoardComplete, subStep, step } = this.props
    const handleNext =
         seedlingBoardComplete
      && step === 4
      && (subStep === 3 || subStep === 4)

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
          visibleAt={[ 2, 3, 4, 5 ]}
          enabledAt={[ 3 ]}
          {...this.props}
        />
      </TextContainer>
    )
  }
}
