import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'

class Audio extends React.Component {
  componentDidUpdate () {
    const el = ReactDOM.findDOMNode(this)
    this.playAudio(el)
    this.pauseAudio(el)
  }

  playAudio (el) {
    if (this.props.audio.playing) {
      if (el.paused) el.play()
    }
  }

  pauseAudio (el) {
    if (!this.props.audio.playing) {
      if (!el.paused) el.pause()
    }
  }

  render () {
    return (
      <audio preload='auto' src='audio/martin-buttrich.mp3' />
    )
  }
}

const mapStateToProps = (state) => ({ audio: state.audio })

export default connect(mapStateToProps)(Audio)
