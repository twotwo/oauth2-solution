// Set the configuration settings
const credentials = {
  client: {
    id: 'abc123',
    secret: 'ssh-secret',
  },
  auth: {
    tokenHost: 'http://localhost:8080',
    tokenPath: '/oauth2/oauth/token',
    authorizePath: '/oauth2/dialog/authorize',
  }
};

// Initialize the OAuth2 Library
const oauth2 = require('simple-oauth2').create(credentials);

// Define Authorization oauth2 URI
const redirect_uri = "http://localhost:4000/express/oauth2/callback"
const authorizationUri = oauth2.authorizationCode.authorizeURL({
  redirect_uri: redirect_uri,
  scope: "sso_backend", // also can be an array of multiple scopes, ex. ['<scope1>, '<scope2>', '...']
  state: "<state>"
})

var express = require('express');
var router = express.Router();

const debug = require("debug")("srv:api:oauth2")

/* Authorization Code flow: Client Identifier & Redirection URI */
router.get('/', function(req, res, next) {
  debug("rediect to %s", authorizationUri)
  // Redirect example using Express (see http://expressjs.com/api.html#res.redirect)
  res.redirect(authorizationUri);
});

/* Authorization Code flow: Authorization Coder & get Access Token */
router.get("/callback", async (req, res) => {
  const code = req.query.code
  const options = {
    code,
    redirect_uri: redirect_uri
  }

  try {
    const result = await oauth2.authorizationCode.getToken(options)

    debug("The resulting token: ", result)

    const token = oauth2.accessToken.create(result)

    return res.status(200).json(token)
  } catch (error) {
    debug("Access Token Error", error.message)
    return res.status(500).json("Authentication failed")
  }
})

module.exports = router;
