const express = require('express')
const app = express()

var serveStatic = require('serve-static')

app.use(serveStatic('..'))

app.get('/', function (req, res) {
  res.send('Hello World')
})

// app.listen(3000);
module.exports = app