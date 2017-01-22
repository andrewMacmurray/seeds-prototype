const addLevelNumbers = require('./constants/_addLevelNumbersHelper.js')
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
        goal: 1000,
        avatars: [ 'sunflower' ],
        trail: { img: '/red/trail-red-11.svg', offset: { x: 0, y: -10.9 }, rotate: 0 },
        probabilities: p.even
      }, {
        offset: { x: -1, y: 0 },
        goal: 800,
        avatars: [ 'sunflower' ],
        trail: { img: '/dark/trail-dark-5.svg', offset: { x: 3.4, y: -2.7 }, rotate: 43 },
        probabilities: p.even
      }, {
        offset: { x: 0, y: -1 },
        goal: 700,
        avatars: [ 'sunflower' ],
        trail: { img: '/dark/trail-dark-4.svg', offset: { x: -3.2, y: -2.8 }, rotate: -45 },
        probabilities: p.noRain
      }, {
        offset: { x: 1, y: -1 },
        goal: 600,
        avatars: [ 'sunflower' ],
        trail: { img: '/dark/trail-dark-4.svg', offset: { x: -2.8, y: -2.5 }, rotate: -45 },
        probabilities: p.noSun,
        tutorial: true,
        threshold: 12
      }, {
        offset: { x: 0, y: 1 },
        goal: 500,
        avatars: [ 'sunflower' ],
        trail: { img: '/dark/trail-dark-5.svg', offset: { x: 3.4, y: -2.5 }, rotate: 45 },
        probabilities: p.noWeather,
        overrideWeather: true,
        initialWeather: 'rain',
        tutorial: true
      }
    ]
  },
  {
    world: 2,
    background: 'orange',
    levels: [
      {
        offset: { x: 0, y: 2 },
        goal: 800,
        avatars: [ 'foxglove' ],
        trail: { img: '', offset: { x: 0, y: -3.6 }, rotate: 0 },
        probabilities: p.even
      }, {
        offset: { x: 0, y: 2 },
        goal: 700,
        avatars: [ 'foxglove' ],
        trail: { img: '/red/trail-red-3.svg', offset: { x: 0, y: -3.6 }, rotate: 0 },
        probabilities: p.even
      }, {
        offset: { x: 0, y: 2 },
        goal: 600,
        avatars: [ 'foxglove' ],
        trail: { img: '/red/trail-red-3.svg', offset: { x: 0, y: -3.6 }, rotate: 0 },
        probabilities: p.even
      }, {
        offset: { x: 0, y: 2 },
        goal: 500,
        avatars: [ 'foxglove' ],
        trail: { img: '/red/trail-red-3.svg', offset: { x: 0, y: -3.6 }, rotate: 0 },
        probabilities: p.even
      }, {
        offset: { x: 0, y: 2 },
        goal: 500,
        avatars: [ 'foxglove' ],
        trail: { img: '/red/trail-red-3.svg', offset: { x: 0, y: -3.6 }, rotate: 0 },
        probabilities: p.even
      }
    ]
  }
]).reverse()
