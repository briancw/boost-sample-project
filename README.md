*FEF OF CHAMPIONS*

Npm Scripts
dev: run the site in dev mode. This will start the server and proxy all requests to /build to a different port. This enables separate tasks to quickly and efficiently rebuild the client and server.
build-client: Build all front end code into minified, production ready bundle in /public/build
production: runs the server. This is subject to change (pm2)
dev-babel: experimental. Use babelified code on the server.
build-server: experimental. Build babelified server code.

Notable Npm Modules
  Core:
      Bluebird: promise library mostly being used for concise coroutines
      jsonwebtoken: lightweight implementation of JWT checking and creation
      thinky: RethinkDB ORM
  Dev:
      Webpack:

Running on your machine
  Create two terminal tabs. In one, run ```npm run dev``` in the other, ```node hmr-server.js```
