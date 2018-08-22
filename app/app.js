// @flow
/**
 * app.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

// Needed for redux-saga es6 generator support
import 'babel-polyfill';

// Import all the third party stuff
import React from 'react';
import ReactDOM from 'react-dom';
import FontFaceObserver from 'fontfaceobserver';
import createHistory from 'history/createBrowserHistory';
// $FlowIssue
import 'sanitize.css/sanitize.css';
import '@blueprintjs/core/lib/css/blueprint.css';

// Load the favicon
/* eslint-disable import/no-webpack-loader-syntax */
// $FlowIssue
import '!file-loader?name=[name].[ext]!./images/favicon.ico';
/* eslint-enable import/no-webpack-loader-syntax */

import Wrapper from './components/Wrapper';
import configureStore from './store/configureStore';

// Observe loading of Open Sans (to remove open sans, remove the <link> tag in
// the index.html file and this observer)
const latoObserver = new FontFaceObserver('Lato');

// When Open Sans is loaded, add a font-family using Open Sans to the body
latoObserver.load().then(
  () => {
    // $FlowIssue
    document.body.classList.add('fontLoaded');
  },
  () => {
    // $FlowIssue
    document.body.classList.remove('fontLoaded');
  }
);

// Create redux store with history
const initialState = {};
const history = createHistory();
const { store, persistor } = configureStore(initialState, history);
const MOUNT_NODE = document.getElementById('app');

const render = () => {
  if (MOUNT_NODE !== null) {
    ReactDOM.render(
      <Wrapper store={store} persistor={persistor} history={history} />,
      MOUNT_NODE
    );
  }
};

// $FlowIssue
if (module.hot) {
  // Hot reloadable React components and translation json files
  // modules.hot.accept does not accept dynamic dependencies,
  // have to be constants at compile-time
  module.hot.accept(['components/Wrapper'], () => {
    ReactDOM.unmountComponentAtNode(MOUNT_NODE);
    render();
  });
}

render();
