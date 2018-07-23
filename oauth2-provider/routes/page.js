"use strict"

const passport = require("passport")
const login = require("connect-ensure-login")
const debug = require("debug")("srv:page")
const context = process.env.CONTEXT || ""
const port = process.env.PORT || "3000"

module.exports.index = (req, res) => {
  // res.send("OAuth 2.0 Server")
  res.locals.server_url =
    req.protocol +
    "://" +
    req.host +
    (port === 80 || port === 443 ? "" : ":" + port) +
    context

  // debug("server_url=%s", res.locals.server_url)
  debug("token = %s", req.query.access_token)
  debug("uri = %O", req.originalUrl)
  if (req.query.code) {
    res.render("index-with-code", { query: req.query })
  } else if (req.query.access_token) {
    res.render("index-with-token", { query: req.query })
  } else {
    res.render("index")
  }
}

module.exports.loginForm = (req, res) => res.render("login")

module.exports.login = passport.authenticate("local", {
  successReturnToOrRedirect: context + "/account",
  failureRedirect: context + "/login"
})

module.exports.logout = (req, res) => {
  req.logout()
  res.redirect(context)
}

module.exports.account = [
  login.ensureLoggedIn(context + "/login"),
  (req, res) => res.render("account", { user: req.user })
]
