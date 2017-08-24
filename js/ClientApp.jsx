// @flow

import React from 'react';
import { render } from 'react-dom';
import Perf from 'react-addons-perf'; // a React performance recording tool
import App from './App';

// NOTE: YOU WILL TAKE OUT PERF TOOLS WHEN YOU GO TO PRODUCTION. PERF TOOLS ARE ONLY FOR DEV
// Add Perf to the window to enable it to record how app performs as you navigate and do things in the app
window.Perf = Perf;
Perf.start();
// When you want to stop recording, go to the console in your app's browser window and type:
// Perf.stop();
// Perf.printWasted();

const renderApp = () => {
  render(<App />, document.getElementById('app'));
};
renderApp();

if (module.hot) {
  module.hot.accept('./App', () => {
    renderApp();
  });
}
