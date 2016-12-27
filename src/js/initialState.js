import { all } from './constants/probabilities.js'

export default {
  level: {
    levelProgress: 6
  },
  tutorial: {
    data: [
      { autoSteps: [ 1, 3 ], total: 4 },
      { autoSteps: [ 2, 3, 5 ], total: 6 },
      { autoSteps: [ 1, 2, 4, 5, 6, 7, 9 ], total: 10,
        board: {
          size: 2,
          probabilities: all.seedlings,
          step: 1
        }
      },
      { autoSteps: [ 1, 3, 4 ], total: 5,
        board: {
          size: 3,
          probabilities: all.seedlings,
          step: 1
        }
      },
      { autoSteps: [ 1 ], total: 12 }
    ],
    step: 1,
    subStep: 1
  },
  view: 'title'
}
