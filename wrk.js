'use strict'

const autocannon = require('autocannon')

module.exports = function(server){
  // console.log(server.name)
  server.listen()
  
  return new Promise(function(resolve, reject){
    server.on('listening', function() {
      var port = server.address().port
      // console.log(port)
    
      const instance = autocannon({
        url: 'http://localhost:' + port,
        title: server.name,
        connections: 100, //default
        pipelining:10,
        duration: 5
      }, finishedBench)

      // autocannon.track(instance)

      // this is used to kill the instance on CTRL-C
      process.once('SIGINT', () => {
        instance.stop()
      })

      function finishedBench (err, res) {
        if (err) {
          reject(err)
        }
        // console.log('finished bench', err, res)
        // instance.stop()
        resolve(res)
      }
    })
  })
}
