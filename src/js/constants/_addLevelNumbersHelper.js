const { addIndex, map, reduce, assoc, prop, compose, add } = require('ramda')

const mapI = addIndex(map)

// type Level : { offset: Int, goal: Int, avatars: Array }

// addLevelKey : Int -> Level -> Level
const addLevelKey = (total, level) => assoc('levelNumber', total, level)

// addLevelNumber : Int -> [ Level ] -> [ Level ]
const addLevelNumber = (total, levels) =>
  mapI((l, i) => addLevelKey(total + i + 1, l), levels)

// getTotal : [ Level ] -> Int
const getTotal = reduce((total, levels) => total + levels.length, 0)


// addLevelNumbers : Int -> [ [ Level ] ] -> [ [ Level ] ]
const addLevelNumbers = (worldTotal, rows) =>
  rows.reduce((acc, levels) => {
    const currentTotal = getTotal(acc) + worldTotal
    const editedLevels = addLevelNumber(currentTotal, levels)
    return acc.concat([ editedLevels ])
  }, [])

// type World : { world: Int, background: String, overlay: String, levels: [ [ Level ] ] }

// editWorldLevels : Int -> World -> [ [ Level ] ]
const editWorldLevels = (worldTotal, world) =>
  assoc('levels', addLevelNumbers(worldTotal, world.levels), world)

// runningTotal : World -> Int
const runningTotal = compose(
  reduce(add, 0),
  map(getTotal),
  map(prop('levels'))
)

// addLevelNumbersToWorlds : [ World ] -> [ World ]
const addLevelNumbersToWorlds = reduce((acc, world) => {
  const t = runningTotal(acc)
  const editedWorld = editWorldLevels(t, world)
  return acc.concat([ editedWorld ])
}, [])

module.exports = addLevelNumbersToWorlds
