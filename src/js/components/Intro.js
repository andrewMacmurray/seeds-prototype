import React from 'react'
import { connect } from 'react-redux'
import { setView, stepIntroText } from '../actions/actionCreators.js'

const text = [
  'our world is dying...',
  'we must gather many seeds...',
  'so a new one can be reborn...'
]

const $text = text.map((t, i) => <p className='intro-text' key={i}>{t}</p>)
const startInterval = (props) => setInterval(props.stepIntroText, 8000)

class Intro extends React.Component {
  constructor () {
    super()
    this.state = { interval: '' }
  }

  componentDidMount () {
    const textStep = startInterval(this.props)
    this.setState({ interval: textStep })
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
