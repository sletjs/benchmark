'use strict'

const Promise = require('bluebird')
const http = require('http')
const fs = require('fs')
var servers = []
var results = []

function createServer(name, app) {
  let s = http.createServer(app)
  s.name = name
  return s
}

fs.readdirSync('./app').forEach(function(file) {
  var app = require('./app/' + file)
  const server = createServer(file.replace('.js', ''), app)
  servers.push(server)
})

Promise.reduce(servers,  (total, _server, index) => {
    return require('./wrk')(_server).then(function(re) {
      results.push(re)
    })
}, 0).then(function(total) {
    //Total is 30
  // console.log(results.length)
  
  for(var i in results) {
    let r = results[i]
    console.log(r.title + " qps = " + r.requests.average)
  }
  let r = {data: results}
  fs.writeFileSync('assets/data.json', JSON.stringify(r, null, 4))
  process.exit(0)
});

