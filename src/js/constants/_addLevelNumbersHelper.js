const { addIndex, map, reduce, assoc, prop, compose, add, length } = require('ramda')

const mapI = addIndex(map)

// type Level : { offset: Int, goal: Int, avatars: Array }

// addLevelKey : Int -> Level -> Level
const addLevelKey = (total, level) => assoc('levelNumber', total, level)

// addLevelNumber : Int -> [ Level ] -> [ Level ]
const addLevelNumber = (total, levels) =>
  mapI((l, i) => addLevelKey(total + levels.length - i, l), levels)

// type World : { world: Int, background: String, overlay: String, levels: [ [ Level ] ] }

// editWorldLevels : Int -> World -> [ Level ]
const editWorldLevels = (worldTotal, world) =>
  assoc('levels', addLevelNumber(worldTotal, world.levels), world)

// levelLength : World -> Int
const levelLength = compose(length, prop('levels'))

// runningTotal : World -> Int
const runningTotal = compose(
  reduce(add, 0),
  map(levelLength)
)

// addLevelNumbersToWorlds : [ World ] -> [ World ]
const addLevelNumbersToWorlds = reduce((acc, world) => {
  const t = runningTotal(acc)
  const editedWorld = editWorldLevels(t, world)
  return acc.concat([ editedWorld ])
}, [])

module.exports = addLevelNumbersToWorlds
