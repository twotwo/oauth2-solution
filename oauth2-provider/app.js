/**
 * Project generat by [express-generator](https://github.com/expressjs/generator)
 *
 * 4 steps practise to improve
 */

// 1. add debug
const debug = require("debug")("srv:app")
const path = require("path")

const createError = require("http-errors")
const express = require("express")
const app = express()

// view engine setup
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "hbs")

// 2. replace cookie-parser with express-session
/**
 * [express-session](https://www.npmjs.com/package/express-session)
 * curl -i http://127.0.0.1:3000 --cookie "sid=s%3AiZIGOUlPy8-tdiTiLyKetrS9GSexb8sJ.2pcuK72%2FqMzwpxDzO42nZRbhLOKh7Nfu32IklPHBsp0"
 */
const session = require("express-session")
app.use(
  session({
    name: "sid", //The name of the session ID cookie to set in the response (and read from in the request).
    secret: "express practise",
    resave: false,
    saveUninitialized: true,
    cookie: {
      // active cookie with HTTP
      secure: false,
      // Specifies the number (in milliseconds) to use when calculating the Expires Set-Cookie attribute.
      maxAge: 3600000 //one hour
    }
  })
)

/**
 * [body-parser](https://github.com/expressjs/body-parser) parse HTTP Body to req.body
 */
const bodyParser = require("body-parser")
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

/**
 * [morgan](https://github.com/expressjs/morgan) HTTP request logger middleware for node.js
 *
 * `common` :remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length]
 * `dev` :method :url :status :response-time ms - :res[content-length]
 */
const logger = require("morgan")
app.use(logger("dev"))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// 3. set context with CONTEXT=...
const context = process.env.CONTEXT || ""
debug("process.env.CONTEXT=%s", context)
app.set("context", context)
// 3.1 set context local for views
app.locals.context = context

// 3.2 set static at context
app.use(app.get("context"), express.static(path.join(__dirname, "public")))

// 4. insert index router to application context
debug("indexRouter@%s", app.get("context"))
const indexRouter = require("./routes/index")
app.use(app.get("context"), indexRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404))
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get("env") === "development" ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render("error")
})

module.exports = app
