const probabilities = {} = module.exports

probabilities.moreSeedlings = {
  sun: 0.125,
  rain: 0.125,
  seedling: 0.70,
  pod: 0.05
}

probabilities.even = {
  sun: 0.25,
  rain: 0.25,
  seedling: 0.4,
  pod: 0.1
}

probabilities.noSun = {
  sun: 0,
  rain: 0.3,
  seedling: 0.6,
  pod: 0.1
}

probabilities.noRain = {
  sun: 0.3,
  rain: 0,
  seedling: 0.6,
  pod: 0.1
}

probabilities.all = {
  sun: {
    sun: 1,
    rain: 0,
    seedling: 0,
    pod: 0
  },
  rain: {
    sun: 0,
    rain: 1,
    seedling: 0,
    pod: 0
  },
  seedlings: {
    sun: 0,
    rain: 0,
    seedling: 1,
    pod: 0
  },
  pod: {
    sun: 0,
    rain: 0,
    seedling: 0,
    pod: 1
  }
}
