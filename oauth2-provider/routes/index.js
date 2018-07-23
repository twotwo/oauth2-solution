const express = require("express")
const router = express.Router()

// /* GET home page. */
// router.get("/", (req, res, next) => {
//   res.render("index", { title: "Express" })
// })

/* Passport configuration */
const passport = require("passport")
router.use(passport.initialize())
router.use(passport.session())
require("../auth")

/* Dispatch sub routers */

// user info
const users = require("./users")
router.use("/users", users)

// Web pages for user
const page = require("./page")
router.get("/", page.index)
router.get("/login", page.loginForm)
router.post("/login", page.login)
router.get("/logout", page.logout)
router.get("/account", page.account)

// Authorization Grant
const oauth2 = require("./oauth2")
router.get("/dialog/authorize", oauth2.authorization)
router.post("/dialog/authorize/decision", oauth2.decision)
router.post("/oauth/token", oauth2.token)

module.exports = router

