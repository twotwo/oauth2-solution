# OAuth2 Solution based on oauth2orize

## Reference

* [OAuth2](http://wiki.li3huo.com/OAuth)
* [npm trends: oauth2-server vs oauth2orize](http://www.npmtrends.com/oauth2-server-vs-oauth2orize-vs-simple-oauth2)
* [oauth2 provider example](https://github.com/gerges-beshay/oauth2orize-examples)
* [oauth2 consumer example](https://github.com/coolaj86/example-oauth2orize-consumer)

## Deployment Diagram

![Deployment Diagram](./doc/deployment.svg)

## Code

### oauth2-provider

An express server provides OAuth2 serivce

Libs in this project:

* express
* express-session
* body-parser
* oauth2orize
* sequelize

### oauth2-consumer