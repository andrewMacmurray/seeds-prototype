const server = require('../server.js')

const _ = {} = module.exports

_.handlePlugins = (err) => {
  if (err) {
    console.log('plugins error: ', err)
    throw err
  }
}

_.handleStart = (err) => {
  if (err) {
    console.log('server error: ', err)
  } else {
    console.log('server listening on port: ' + server.info.port)
  }
}
