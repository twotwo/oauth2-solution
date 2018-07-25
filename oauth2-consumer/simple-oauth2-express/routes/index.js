const express = require("express")
const router = express.Router()

/* GET home page. */
router.get("/", (req, res, next) => {
  res.render("index", { title: "OAuth2 Consumer Demo" })
})

/* Dispatch sub routers */
const oauth2 = require("./oauth2")
router.use("/oauth2", oauth2)

module.exports = router

