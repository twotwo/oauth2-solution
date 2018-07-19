const express = require("express")
const router = express.Router()

/* GET home page. */
router.get("/", (req, res, next) => {
  res.render("index", { title: "Express" })
})

/* Dispatch sub routers */
const users = require("./users")
router.use("/users", users)

module.exports = router

