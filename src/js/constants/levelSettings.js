const addLevelNumbers = require('./_addLevelNumbersHelper.js')

// each level reads as if it were on the screen
// i.e. for each world object
// the first level in the world is the one at the bottom (i.e. the last element in the array)
module.exports = addLevelNumbers([
  {
    world: 1,
    background: '',
    overlay: '',
    levels: [
      {
        offset: { x: 0, y: 0 },
        goal: 100,
        avatars: [ 'sunflower' ],
        trail: { img: '/red/trail-0.svg', offset: { x: -1.3, y: -10.9 } }
      }, {
        offset: { x: 1, y: 0 },
        goal: 60,
        avatars: [ 'sunflower' ],
        trail: { img: '/dark/trail-4.svg', offset: { x: 0, y: -5.7 } }
      }, {
        offset: { x: 0, y: -1 },
        goal: 50,
        avatars: [ 'sunflower' ],
        trail: { img: '/dark/trail-3.svg', offset: { x: 2, y: -2 } }
      }, {
        offset: { x: -1, y: -1 },
        goal: 30,
        avatars: [ 'sunflower' ],
        trail: { img: '/dark/trail-2.svg', offset: { x: 1.8, y: -2.6 } }
      }, {
        offset: { x: 0, y: 1 },
        goal: 20,
        avatars: [ 'sunflower' ],
        trail: { img: '/dark/trail-1.svg', offset: { x: -3.5, y: -1 } }
      }
    ]
  },
  {
    world: 2,
    background: 'orange',
    overlay: '',
    levels: [
      {
        offset: { x: 0, y: 0 },
        goal: 250,
        avatars: [ 'foxglove' ],
        trail: { img: 'trail.svg', offset: { x: 0, y: 0 } }
      }, {
        offset: { x: 0, y: 0 },
        goal: 100,
        avatars: [ 'foxglove' ],
        trail: { img: 'trail.svg', offset: { x: 0, y: 0 } }
      }, {
        offset: { x: 0, y: 0 },
        goal: 200,
        avatars: [ 'foxglove' ],
        trail: { img: 'trail.svg', offset: { x: 0, y: 0 } }
      }, {
        offset: { x: 0, y: 0 },
        goal: 100,
        avatars: [ 'foxglove' ],
        trail: { img: 'trail.svg', offset: { x: 0, y: 0 } }
      }, {
        offset: { x: 0, y: 0 },
        goal: 100,
        avatars: [ 'foxglove' ],
        trail: { img: 'trail.svg', offset: { x: 0, y: 0 } }
      }
    ]
  }
]).reverse()
