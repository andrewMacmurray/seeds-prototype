import React from 'react'
import { connect } from 'react-redux'
import {
  setView,
  stepIntroText
} from '../actions/actionCreators.js'

const text = [
  'our world is dying...',
  'we must gather many seeds...',
  'so a new one can be reborn...'
]

const $text = text.map((t, i) => <p className='intro-text' key={i}>{t}</p>)
const startInterval = (props) => setInterval(props.stepIntroText, 6000)

class Intro extends React.Component {
  constructor (props) {
    super(props)
    this.state = { interval: startInterval(props) }
  }

  render () {
    const { introTextStep } = this.props.text
    if (introTextStep >= text.length) clearInterval(this.state.interval)
    return (
      <div className='intro'>
        {$text[introTextStep]}
      </div>
    )
  }
}

const mapStateToProps = state => ({ ...state })

export default connect(mapStateToProps, { setView, stepIntroText })(Intro)
