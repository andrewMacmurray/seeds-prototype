const addLevelNumbers = require('./_addLevelNumbersHelper.js')

module.exports = addLevelNumbers([
  {
    world: 1,
    background: '',
    overlay: '',
    levels: [
      [{
        offset: 0,
        goal: 100,
        avatars: [ 'seed' ]
      }],

      [{
        offset: 0,
        goal: 100,
        avatars: [ 'seed' ]
      }, {
        offset: 1,
        goal: 200,
        avatars: [ 'seed' ]
      }, {
        offset: 2,
        goal: 100,
        avatars: [ 'seed' ]
      }],

      [{
        offset: 0,
        goal: 250,
        avatars: [ 'seed' ]
      }]
    ]
  },
  {
    world: 2,
    background: 'orange',
    overlay: '',
    levels: [
      [{
        offset: 0,
        goal: 100,
        avatars: [ 'seed-circle' ]
      }],

      [{
        offset: 0,
        goal: 100,
        avatars: [ 'seed-circle' ]
      }, {
        offset: 1,
        goal: 200,
        avatars: [ 'seed-circle' ]
      }, {
        offset: 2,
        goal: 100,
        avatars: [ 'seed-circle' ]
      }],

      [{
        offset: 0,
        goal: 250,
        avatars: [ 'seed-circle' ]
      }]
    ]
  }
]).map(world => ({ ...world, levels: world.levels.reverse() })).reverse()
