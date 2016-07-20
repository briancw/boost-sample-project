# BOOST JS 🚀 #

## Npm Scripts ##
* dev: run the site in dev mode. This will start the server and proxy all requests to /build to a different port. This enables separate tasks to quickly and efficiently rebuild the client and server.
* build-client: Build all front end code into minified, production ready bundle in /public/build
* production: runs the server. This is subject to change (pm2)
* dev-babel: experimental. Use babelified code on the server.
* build-server: experimental. Build babelified server code.

## Notable Npm Modules ##
### Core: ###
  * Bluebird: promise library mostly being used for concise coroutines
  * jsonwebtoken: lightweight implementation of JWT checking and creation
  * thinky: RethinkDB ORM
  * socket.io: socket connections between server and client with multiplexing, fallbacks, auto-reconnect, and other useful features
### Dev: ###
  * webpack: Bundles markup, clientside scripts, and styles into all.min.js
  * babel: allows writing modern js with recompilation to work on older browsers
  * babel-preset-es2015/stage-3: allows using cutting edge JS features
  * hot module reloading: vue-hot-reload-api, vue-html-loader, vue-loader, webpack-dev-middleware, webpack-dev-server, and webpack-hot-middleware are all used to hot reload clientside code

## Running on your machine ##
#### Prep ####
This project requires Rethinkdb to be installed on your machine
  https://www.rethinkdb.com/docs/install/

Additionally, you will need node and npm. Current recommend version is 6.x

All client and server dependencies are managed via npm. Run ```npm install``` to get them

Server reloading requires nodemon. To install it, run ```npm install -g nodemon```


Create 3 terminal tabs and run the following
```
#!sh
rethinkdb
node hmr-server.js
npm run dev

```
