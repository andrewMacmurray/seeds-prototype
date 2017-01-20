import React from 'react'
import { connect } from 'react-redux'
import Tutorial1 from './Tutorial-Level-1/Index.js'
import Tutorial2 from './Tutorial-Level-2/Index.js'

import stepForward from '../../redux/actionSequences/tutorial/stepForward.js'
import initTutorial from '../../redux/actionSequences/tutorial/initTutorial.js'
import tutorialSequenceDataMap from './tutorialSequenceDataMap.js'

class Tutorial extends React.PureComponent {

  componentDidMount () {
    const { level } = this.props
    const currentTutorialData = tutorialSequenceDataMap[level]

    this.props.initTutorial(currentTutorialData)
  }

  checkBoardComplete = ({ boardType, renderStep, completeStep }) => {
    const { substep, step } = this.props
    const boardComplete = this.props[boardType]
    const handleNext =
         boardComplete
      && step === renderStep
      && substep === completeStep

    setTimeout(() =>
      handleNext
        ? this.props.stepForward()
        : this.checkBoardComplete({ boardType, renderStep, completeStep })
    , 300)
  }

  render () {
    const renderMap = {
      1: <Tutorial1 {...this.props} checkBoardComplete={this.checkBoardComplete} />,
      2: <Tutorial2 {...this.props} checkBoardComplete={this.checkBoardComplete} />
    }

    return (
      <div>
        {renderMap[this.props.level] || ''}
      </div>
    )
  }
}

import {
  seedBoardComplete,
  seedPodBoardComplete
} from '../../redux/selectors/tutorial/selector_tutorialBoardComplete.js'

const mapStateToProps = (state) => ({
  ...state.level.currentLevel,
  ...state.tutorial,
  seedPodBoardComplete: seedPodBoardComplete(state),
  seedBoardComplete: seedBoardComplete(state)
})

export default connect(mapStateToProps, { stepForward, initTutorial })(Tutorial)
