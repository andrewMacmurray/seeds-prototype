import tutorials from './constants/tutorials.js'

export default {
  level: {
    levelProgress: 6
  },
  tutorial: {
    ...tutorials[0],
    step: 0,
    visibleText: [ 1, 0, 0, 0 ]
  },
  view: 'tutorial'
}
