
'use strict'


const http = require('http')

var app = require('./app/koa2')
const server = http.createServer(app.callback())

server.listen()

server.on('listening', function() {
  var port = server.address().port
  console.log(port)
  
  require('./wrk')(port, function (results) {
    console.log(results)
  })
})

