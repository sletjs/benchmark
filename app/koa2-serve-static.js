const Koa = require('koa')
const serveStatic = require('koa-serve-static')

const app = new Koa()

// $ GET /package.json
app.use(serveStatic('.'))

// response
app.use(ctx => {
  ctx.body = 'Hello Koa'
})

// app.listen(3000)
module.exports = app.callback()
