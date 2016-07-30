require('env2')('./config.env')

const Hapi = require('hapi')
const server = new Hapi.Server()
const port = process.env.PORT || 4000

// helper methods
const { handlePlugins, handleStart } = require('./helpers/server-helpers.js')

// server plugins
const Inert = require('inert')

// server routes
const Images = require('./routes/Images.js')
const ReactUrls = require('./routes/ReactUrls.js')
const Scripts = require('./routes/Scripts.js')

const Plugins = [ Inert ]
const Routes = [ Images, ReactUrls, Scripts ]

server.connection({ port })
server.register(Plugins, handlePlugins)
server.route(Routes)
server.start(handleStart)

module.exports = server
