import React from 'react'
import { connect } from 'react-redux'
import Step1 from './Step1.js'
import Step2 from './Step2.js'
import handleNextTutorialStep from '../../redux/actionSequences/tutorial/handleNextTutorialStep.js'

class Tutorial extends React.PureComponent {

  componentDidMount () {
    setTimeout(this.props.handleNextTutorialStep, 500)
  }

  render () {
    return (
      <div>
        <div className='tutorial-container'>
          <Step2 {...this.props} />
          <Step1 {...this.props} />
        </div>
      </div>
    )
  }

}

const mapStateToProps = (state) => ({ ...state.tutorial })

export default connect(mapStateToProps, { handleNextTutorialStep })(Tutorial)
