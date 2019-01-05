const express = require('express')
const path = require('path')
const logger = require('morgan')
const app = express()

const config = require('./config')
const env = process.env['NODE_ENV'] || 'development'

app.use(logger('common'))

if (env === 'production') {
  app.use(function (req, res, next) {
    if (!req.secure) {
      return res.redirect('https://' + req.get('host') + req.url)
    }

    next()
  })
}

app.use(express.static(path.join(__dirname, 'build')))

app.get('*', function (req, res) {
  res.sendFile(path.resolve(__dirname, 'build', 'index.html'))
})

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

app.listen(config.port)
