import { all } from './constants/probabilities.js'

const auto = true
const delay = 1000

export default {
  level: {
    levelProgress: 3
  },
  tutorial: {
    data: [
      { subSteps: [
        { delay, auto },
        { delay },
        { delay, auto },
        { delay: 600 }
      ] },
      { subSteps: [
        { delay },
        { delay, auto },
        { delay: 600, auto },
        { delay },
        { delay, auto },
        { delay }
      ] },
      { subSteps: [
        { delay, auto },
        { delay: 400, auto },
        { delay },
        { delay, auto },
        { delay: 1500, auto },
        { delay, auto },
        { delay, auto },
        { delay },
        { delay: 2000, auto },
        { delay }
      ],
        board: { size: 2, probabilities: all.seedlings, step: 1 }
      },
      { subSteps: [
        { delay, auto },
        { delay },
        { delay: 2000, auto },
        { delay, auto },
        { delay: 2000 }
      ],
        board: { size: 3, probabilities: all.seedlings, step: 1 }
      },
      { subSteps: [
        { delay, auto },
        { delay },
        { delay: 2000, auto },
        { delay, auto },
        { delay, auto },
        { delay },
        { delay, auto },
        { delay }
      ] }
    ],
    step: 1,
    subStep: 1
  },
  view: 'hub'
}
