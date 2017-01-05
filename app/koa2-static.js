const Koa = require('koa')
const serve = require('koa-static')

const app = new Koa()

// $ GET /package.json
app.use(serve('.'))

// response
app.use(ctx => {
  ctx.body = 'Hello Koa'
})

// app.listen(3000)
module.exports = app.callback()
