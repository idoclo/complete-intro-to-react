/* eslint no-console:0 */
require('babel-register'); // everything in this file itself will not be transpiled; but everything that it requires will be run through babel

const express = require('express');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const ReactRouter = require('react-router-dom');
const _ = require('lodash');
const fs = require('fs');
const compression = require('compression'); // building for production
const webpackDevMiddleware = require('webpack-dev-middleware'); // to fix hot module reload
const webpackHotMiddleware = require('webpack-hot-middleware'); // to fix hot module reload
const webpack = require('webpack'); // to fix hot module reload
const App = require('./js/App').default; // .default because we export default; we export an {} with one key which is default
const config = require('./webpack.config'); // to fix hot module reload

const StaticRouter = ReactRouter.StaticRouter; // StaticRouter in Node is what we will use to replace BrowserRouter
const port = 8080;
const baseTemplate = fs.readFileSync('./index.html'); // readFileSync is going to read index.html and will pause until it finishes reading. It will only be read once when you start up your server.
const template = _.template(baseTemplate) // template is a function that when invoked takes in body and gives back our markup inside index.html

const server = express();

const compiler = webpack(config); // to fix hot module reload; we're instantiating our webpack
server.use(
  webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath
  })
);
server.use(webpackHotMiddleware(compiler));
// At this point we have set up our server to do server-side rendering and hot module reload

server.use(compression()); // building for production
server.use('/public', express.static('./public')); // statically serve everything in the public directory

server.use((req, res) => {
  console.log('req.url', req.url);
  const context = {}; // pass in context {} to body because sometimes you will get redirected.
  const body = ReactDOMServer.renderToString(
    // lines 26 to 36 is server-side rendering with ReactRouter
    React.createElement(StaticRouter, { location: req.url, context },  // context: context is the same as context
      React.createElement(App)
    )
  );

  if (context.url) {
    res.redirect(context.url);
  }

  res.write(template({body})); // or body: body
  res.end();
});


server.listen(port, () => {
  console.log(`listening on port ${port}`);
});


/* Server-side rendering:
The first page that the client loads is pre-rendered then once React takes over it goes back to its old single page application
Typically reserve server-side rendeing just for production and elave the rest of it in the dev config because it is a lot less of a problem to mess around with in development
*/