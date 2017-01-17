const p = {} = module.exports

p.moreSeedPods = {
  sun: 0.125,
  rain: 0.125,
  seedPod: 0.70,
  seed: 0.05
}

p.even = {
  sun: 0.25,
  rain: 0.25,
  seedPod: 0.4,
  seed: 0.1
}

p.noSun = {
  sun: 0,
  rain: 0.3,
  seedPod: 0.6,
  seed: 0.1
}

p.noRain = {
  sun: 0.3,
  rain: 0,
  seedPod: 0.6,
  seed: 0.1
}

p.noWeather = {
  sun: 0,
  rain: 0,
  seedPod: 0.8,
  seed: 0.2
}

p.all = {
  sun: {
    sun: 1,
    rain: 0,
    seedPod: 0,
    seed: 0
  },
  rain: {
    sun: 0,
    rain: 1,
    seedPod: 0,
    seed: 0
  },
  seedPods: {
    sun: 0,
    rain: 0,
    seedPod: 1,
    seed: 0
  },
  seed: {
    sun: 0,
    rain: 0,
    seedPod: 0,
    seed: 1
  }
}
