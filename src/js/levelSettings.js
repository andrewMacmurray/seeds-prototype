const addLevelNumbers = require('./constants/_addLevelNumbersHelper.js')
const tutorials = require('./constants/tutorials.js')

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
        trail: { img: '/red/trail-red-11.svg', offset: { x: 0, y: -10.9 }, rotate: 0 }
      }, {
        offset: { x: 1, y: 0 },
        goal: 60,
        avatars: [ 'sunflower' ],
        trail: { img: '/dark/trail-dark-3.svg', offset: { x: -1.9, y: -1.7 }, rotate: -43 }
      }, {
        offset: { x: 0, y: -1 },
        goal: 50,
        avatars: [ 'sunflower' ],
        trail: { img: '/dark/trail-dark-3.svg', offset: { x: 2.2, y: -0.9 }, rotate: 45 }
      }, {
        offset: { x: -1, y: -1 },
        goal: 30,
        avatars: [ 'sunflower' ],
        trail: { img: '/dark/trail-dark-3.svg', offset: { x: 1.9, y: -2 }, rotate: 45 }
      }, {
        offset: { x: 0, y: 1 },
        goal: 20,
        avatars: [ 'sunflower' ],
        trail: { img: '/dark/trail-dark-4.svg', offset: { x: -2.2, y: -1.8 }, rotate: -45 },
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
        trail: { img: 'trail.svg', offset: { x: 0, y: 0 }, rotate: 90 }
      }, {
        offset: { x: 0, y: 0 },
        goal: 100,
        avatars: [ 'foxglove' ],
        trail: { img: 'trail.svg', offset: { x: 0, y: 0 }, rotate: 90 }
      }, {
        offset: { x: 0, y: 0 },
        goal: 200,
        avatars: [ 'foxglove' ],
        trail: { img: 'trail.svg', offset: { x: 0, y: 0 }, rotate: 90 }
      }, {
        offset: { x: 0, y: 0 },
        goal: 100,
        avatars: [ 'foxglove' ],
        trail: { img: 'trail.svg', offset: { x: 0, y: 0 }, rotate: 90 }
      }, {
        offset: { x: 0, y: 0 },
        goal: 100,
        avatars: [ 'foxglove' ],
        trail: { img: 'trail.svg', offset: { x: 0, y: 0 }, rotate: 90 }
      }
    ]
  }
]).reverse()
