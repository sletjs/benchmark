
'use strict'

const Promise = require('bluebird')
const http = require('http')

function createServer(name, app){
  let s = http.createServer(app)
  s.name = name
  return s
}

var app = require('./app/koa2')

const koa2 = createServer('koa2', app.callback())

var expressapp = require('./app/express')

const express = createServer('express', expressapp)

var servers = [koa2, express]

var results = []

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
  
  process.exit(0)
});

