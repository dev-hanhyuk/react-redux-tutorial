# A simple tutorial for beginners

This tutorial targets on beginners who are interested in implementing react/redux applications from scratch.


## Contents
1. npm/server/webpack setup with express.js
2. reducers/rootReducer/store/provider/component using Products example
3. TBD


## 1. Initialize npm
`npm init -y`


## 2. Install necessary packages for webpack react/redux application
Copy below commands and paste on CLI

###Dev-dependencies
`npm install --save-dev babel babel-core babel-loader babel-preset-es2015 babel-preset-react babel-preset-stage-2 css-loader node-sass sass-loader style-loader volleyball webpack`

###Dependencies
`npm install --save express nodemon react react-dom react-redux react-router redux redux-logger redux-thunk`

### Dependencies
* express: sets up a running HTTP server
* lodash: (optional) utility module
* nodemon: watches real-time modification of application
* react: Core module for react application(Component)
* react-dom: Core module for react application(render)
* react-redux: Core module for react-redux application(Provider)
* react-router: Core module for react application(Link, browserHistory)
* redux: Core module for redux application(createStore)
* redux-logger: redux debugging tool
* redux-thunk: manages redux asynchronous dispatch actions


### Development dependencies
* babel, babel-core, babel-loader: a compiler that transforms future syntax into compatiable javascript language
* babel-preset-es2015, babel-preset-stage-2, babel-preset-react: enable ES-6 and react syntaxes in dev-environment
* style-loader, css-loader, node-sass, sass-loader: enable webpack to transpile styles, such as css, sass, scss
* vollyeball: watches access to server
* webpack: a core module bundler


## 3. Webpack configuration
webpack is a module bundler, meaning that it combines all the modules you create into one static bundle file(such as `bundle.js`) by injecting modules and dependencies. Therefore, developer should explicitly set the `entry`, `resolve-extensions` to specify file extensions you want to transpile, `module-loader`s to use for transpiling, and `output` to locate the static bundle.

1. create `webpack.config.js`
2. set up entry, resolve, module, and output
3. According to `entry` and `output`, create directories(`public`, `app`), and files(`/app/main.js`)<br/>

### Check out `webpack.config.js` in the repository



## 4. Setup babel preset
initialize babel setup by creating a `.babelrc` file

1. `touch .babelrc`
2. edit `.babelrc` file
```JSON
{
    "presets": [
        "react",
        "es2015",
        "stage-2"
    ]
}
```

## 5. Prepare a simple `index.html` template, and `main.js` to provide
Create `public` directory, and create `index.html`
The `index.html` will load `bundle.js` once webpack generates the bundle

```html
<html>
  <head>
    <meta charset="utf-8">
  </head>
  <body>
    <div id="main"></div>
    <script async defer src="bundle.js"></script>
  </body>
</html>
```

Also, prepare a simple `main.js` in `app` directory
```JSX

import React from 'react';
import { render } from 'react-dom';

render (
  <h1>Hello World</h1>,
  document.getElementById('main')
);

```

## 6. Express server setup
Implement a simple express server

```javascript

'use strict'

const express = require('express');
const app = express();
const { resolve } = require('path');
const PORT = process.env.PORT || 3000;

app.use(require('volleyball')); //debuggin purpose, not necessary for a production setting
app.use(express.static(resolve(__dirname, '..', 'public'))); //setup static directories
app.use(express.static(resolve(__dirname, '..', 'db')));

app.get('/*', (req, res) => {
  // if users access any route, `index.html` will be sent to users
  // also, you need to create a simple html template to provide
  res.sendFile(resolve(__dirname, '..', 'public', 'index.html'));
})

//running the server
app.listen(PORT, () => {
  console.log('App listening on port 3000!')
})
```

## 7. Runnig a server and access to localhost
Add this below line in `package.json` to create starting commands for the server

```JSON
"scripts": {
  "start": "nodemon server/start.js",
  "build-watch": "webpack -w"
}
```

Now on CLI, try this command with "TWO" different tabs

`npm run build-watch`
`npm start`

`npm start` will automatically run `nodemon server/start.js`, and `npm run build-watch` will watch over your modification and update them to the bundle file while the server is running.


## 8. Let's get started building applications
On the web browser, access `localhost:3000`, and you will see "Hello World" on the screen. Yay!





