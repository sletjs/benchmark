const Koa = require('koa')
const router = require('koa-router')()
const serve = require('koa-static')

const app = new Koa()

// $ GET /package.json
app.use(serve('.'))

router.get('/', function (ctx, next) {
    ctx.body = 'Hello Koa'
})

app
  .use(router.routes())
  .use(router.allowedMethods())

// app.listen(3000)
module.exports = app.callback()