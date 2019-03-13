const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const sassMiddleware = require('node-sass-middleware')
const paginate = require('express-paginate')
const bodyParser = require('body-parser')
const connect = require('./schemas/db/db.connect')
const helmet = require('helmet')
const cors = require('cors')

const routes = require('./routes/routes')

const app = express()

// CORS
app.use(cors())

// connect DB
connect()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(paginate.middleware(100, 1000))
app.use(logger('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(sassMiddleware({
  src: path.join(__dirname, 'sass'),
  dest: path.join(__dirname, 'public/stylesheets'),
  outputStyle: 'compressed',
  indentedSyntax : false,
  prefix: '/stylesheets',
}))

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(__dirname + '/node_modules/jquery/dist'))
app.use(express.static(__dirname + '/node_modules/popper.js/dist'))
app.use(express.static(__dirname + '/node_modules/bootstrap/dist'))

app.use(helmet())
app.disable('x-powered-by')

app.use('/', routes)

app.use(function(req, res, next) {
  next(createError(404))
})

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message
  res.status(err.status || 500)

  if(req.app.get('env') === 'production') {
    res.status(err.status)
  } else {
    res.render('error', {error: err})
  }
})

module.exports = app
