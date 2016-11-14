require('env2')('./config.env')

const Hapi = require('hapi')
const server = new Hapi.Server()
const port = process.env.PORT || 4000

// helper methods
const { handlePlugins, handleStart } = require('./helpers/server-helpers.js')

// plugins
const Plugins = [
  'Inert'
].map(require)

// routes
const Routes = [
  './routes/Images.js',
  './routes/ReactUrls.js',
  './routes/Scripts.js'
].map(require)

server.connection({ port })
server.register(Plugins, handlePlugins)
server.route(Routes)
server.start(handleStart, 4000)

module.exports = server
