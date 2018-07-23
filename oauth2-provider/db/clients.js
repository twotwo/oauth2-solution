"use strict"

const debug = require("debug")("db:clients")

const clients = [
  {
    id: "1",
    name: "Samplr",
    clientId: "abc123",
    clientSecret: "ssh-secret",
    isTrusted: true
  },
  {
    id: "2",
    name: "Samplr2",
    clientId: "xyz123",
    clientSecret: "ssh-password",
    isTrusted: true
  }
]

module.exports.findById = (id, done) => {
  for (let i = 0, len = clients.length; i < len; i++) {
    debug("findById, id=%s, clients=%o", id, clients)
    if (clients[i].id === id) return done(null, clients[i])
  }
  return done(new Error("Client Not Found"))
}

module.exports.findByClientId = (clientId, done) => {
  for (let i = 0, len = clients.length; i < len; i++) {
    debug("findByClientId, clientId=%s, clients=%o", clientId, clients)
    if (clients[i].clientId === clientId) return done(null, clients[i])
  }
  return done(new Error("Client Not Found"))
}
