"use strict"
const debug = require("debug")("db:codes")

const codes = {}

module.exports.find = (key, done) => {
  if (codes[key]) {
    debug("find key=%s", key)
    return done(null, codes[key])
  }
  debug("find nothing: key=%s, codes=%o", key, codes)
  return done(new Error("Code Not Found"))
}

module.exports.save = (code, clientId, redirectUri, userId, done) => {
  debug("save code=%s", code)
  codes[code] = { clientId, redirectUri, userId }
  done()
}
