import { all } from './constants/probabilities.js'

export default {
  level: {
    levelProgress: 6
  },
  tutorial: {
    data: [
      { autoSteps: [ 1, 3 ], total: 4 },
      { autoSteps: [ 2, 3, 5, 6 ], total: 7 },
      { autoSteps: [ 1, 2, 4, 5, 6, 7 ], total: 10,
        board: {
          size: 2,
          probabilities: all.seedlings,
          step: 1
        }
      }
    ],
    step: 1,
    subStep: 1
  },
  view: 'tutorial'
}
