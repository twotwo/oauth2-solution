# Aauth2 Provider based on oauth2orize

## Dependencies

 * express-generator `npm install -g express-generator # Gloabal Install`

## Generate Project by express-generator

Make sure you have [Node.js](http://nodejs.org/) lts/carbon and [express-generator](http://wiki.li3huo.com/Node.js#express-generator) installed.

```bash
➜  oauth2-provider git:(master) ✗ express --version
4.16.0
➜  oauth2-provider git:(master) ✗ express -v hbs -f

   create : public/
   create : public/javascripts/
   create : public/images/
   create : public/stylesheets/
   create : public/stylesheets/style.css
   create : routes/
   create : routes/index.js
   create : routes/users.js
   create : views/
   create : views/error.hbs
   create : views/index.hbs
   create : views/layout.hbs
   create : app.js
   create : package.json
   create : bin/
   create : bin/www

   install dependencies:
     $ npm install

   run the app:
     $ DEBUG=oauth2-provider:* npm start
```

### Add libs 

```bash
➜  oauth2-provider git:(master) ✗ npm i cross-env body-parser express-session oauth2orize
➜  oauth2-provider git:(master) ✗ npm i --save-dev nodemon validate-commit-msg
```

```bash
# libs for OAuth2 Server
➜  oauth2-provider git:(master) ✗ npm i passport passport-local passport-http passport-http-bearer passport-oauth2-client-password connect-ensure-login
```

## Run Service

```bash
➜  oauth2-provider git:(master) ✗ npm i # install libs
➜  oauth2-provider git:(master) ✗ npm run dev # run in development mode
```

### Grant Type: Authorization Code

```bash
http://localhost:8080/oauth2/dialog/authorize?redirect_uri=https://oauth2orizerecipes.herokuapp.com&response_type=code&client_id=abc123&scope=offline_access
```

### Grant Type: Implicit

```bash
http://localhost:8080/oauth2/dialog/authorize?redirect_uri=https://oauth2orizerecipes.herokuapp.com&response_type=token&client_id=abc123
```