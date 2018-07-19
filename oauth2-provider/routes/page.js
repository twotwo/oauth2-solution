'use strict';

const passport = require('passport');
const login = require('connect-ensure-login');
const context = process.env.CONTEXT || "/"

module.exports.index = (request, response) => response.send('OAuth 2.0 Server');

module.exports.loginForm = (request, response) => response.render('login');

module.exports.login = passport.authenticate("local", {
  successReturnToOrRedirect: context,
  failureRedirect: context+"/login"
})

module.exports.logout = (request, response) => {
  request.logout();
  response.redirect(context)
};

module.exports.account = [
  login.ensureLoggedIn(),
  (request, response) => response.render('account', { user: request.user }),
];
