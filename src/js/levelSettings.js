const addLevelNumbers = require('./constants/_addLevelNumbersHelper.js')
const tutorials = require('./constants/tutorials.js')
const p = require('./constants/probabilities.js')

// each level reads as if it were on the screen
// i.e. for each world object
// the first level in the world is the one at the bottom (i.e. the last element in the array)
module.exports = addLevelNumbers([
  {
    world: 1,
    background: '',
    levels: [
      {
        offset: { x: 0, y: 0 },
        goal: 100,
        avatars: [ 'sunflower' ],
        trail: { img: '/red/trail-red-11.svg', offset: { x: 0, y: -10.9 }, rotate: 0 },
        probabilities: p.even
      }, {
        offset: { x: -1, y: 0 },
        goal: 60,
        avatars: [ 'sunflower' ],
        trail: { img: '/dark/trail-dark-5.svg', offset: { x: 3.4, y: -3.8 }, rotate: 43 },
        probabilities: p.even
      }, {
        offset: { x: 0, y: -1 },
        goal: 50,
        avatars: [ 'sunflower' ],
        trail: { img: '/dark/trail-dark-4.svg', offset: { x: -3, y: -2.3 }, rotate: -45 },
        probabilities: p.noSun
      }, {
        offset: { x: 1, y: -1 },
        goal: 30,
        avatars: [ 'sunflower' ],
        trail: { img: '/dark/trail-dark-4.svg', offset: { x: -2.7, y: -3 }, rotate: -45 },
        probabilities: p.noRain
      }, {
        offset: { x: 0, y: 1 },
        goal: 20,
        avatars: [ 'sunflower' ],
        trail: { img: '/dark/trail-dark-5.svg', offset: { x: 3.4, y: -2.5 }, rotate: 45 },
        probabilities: p.noSun,
        tutorial: tutorials[0]
      }
    ]
  },
  {
    world: 2,
    background: 'orange',
    levels: [
      {
        offset: { x: 0, y: 0 },
        goal: 250,
        avatars: [ 'foxglove' ],
        trail: { img: 'trail.svg', offset: { x: 0, y: 0 }, rotate: 90 },
        probabilities: p.even
      }, {
        offset: { x: 0, y: 0 },
        goal: 100,
        avatars: [ 'foxglove' ],
        trail: { img: 'trail.svg', offset: { x: 0, y: 0 }, rotate: 90 },
        probabilities: p.even
      }, {
        offset: { x: 0, y: 0 },
        goal: 200,
        avatars: [ 'foxglove' ],
        trail: { img: 'trail.svg', offset: { x: 0, y: 0 }, rotate: 90 },
        probabilities: p.even
      }, {
        offset: { x: 0, y: 0 },
        goal: 100,
        avatars: [ 'foxglove' ],
        trail: { img: 'trail.svg', offset: { x: 0, y: 0 }, rotate: 90 },
        probabilities: p.even
      }, {
        offset: { x: 0, y: 0 },
        goal: 100,
        avatars: [ 'foxglove' ],
        trail: { img: 'trail.svg', offset: { x: 0, y: 0 }, rotate: 90 },
        probabilities: p.even
      }
    ]
  }
]).reverse()
