const _ = {}

_.wait = (ms) => {
  let timeout, _reject
  const p = new Promise((resolve, reject) => {
    timeout = setTimeout(resolve, ms)
    _reject = reject
  })

  p.cancel = () => {
    clearTimeout(timeout)
    _reject('Cancelled')
  }

  return p
}

module.exports = _
