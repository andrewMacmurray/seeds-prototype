const _ = {}

_.wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

module.exports = _
