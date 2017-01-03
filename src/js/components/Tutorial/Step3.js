import React from 'react'
import Next from './Next.js'
import TextContainer from './TextContainer.js'
import TutorialBoard from './TutorialBoard.js'
import Line from './Line.js'

const textContent = [
  { text: 'These are seed pods', visibleAt: [ 3, 4 ] },
  { text: 'They are almost ready to bear seeds', visibleAt: [ 6 ] },
  { text: 'Connect them to release the seeds', visibleAt: [ 8, 9 ] },
  { text: 'Brilliant!', visibleAt: [ 10, 11 ] }
]

export default class Step3 extends React.PureComponent {

  componentDidMount () {
    this.checkBoardComplete()
  }

  checkBoardComplete = () => {
    const { seedlingBoardComplete, subStep, step } = this.props
    const handleNext =
         seedlingBoardComplete
      && step === 3
      && (subStep === 8 || subStep === 9)

    setTimeout(() =>
      handleNext
        ? this.props.handleNextTutorialStep()
        : this.checkBoardComplete()
    , 300)
  }

  render () {
    return (
      <TextContainer {...this.props}>
        {textContent.map((settings, i) =>
          <Line key={i} className='abs' {...settings} {...this.props} />
        )}
        <TutorialBoard
          visibleAt={[ 2, 3, 4, 5, 6, 7, 8, 9, 10 ]}
          enabledAt={[ 8, 9 ]}
          {...this.props}
        />
        <Next
          visibleAt={[ 4, 5, 6, 7, 8 ]}
          {...this.props}
        />
      </TextContainer>
    )
  }
}
