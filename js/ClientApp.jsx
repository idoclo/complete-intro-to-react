// @flow

import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
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
  // Now BrowserRouter is only going to render on the client. This frees up the node side to use a different kind of router
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
    document.getElementById('app')
  );
};
renderApp();


if (module.hot) {
  module.hot.accept('./App', () => {
    renderApp();
  });
}

/* Hot module reload (HMR) will take your code, compile it on the fly, and then inject it into your live-running code.
If you're working a dropdown that requires three different clicks to get there, it's pretty neat to be able to change the code and watch the UI change without having to reload and get the UI back into a state where you can see the effects of your change.
How does it work? Seems magical. Well, since we're using ES6 modules, it means the dependency graph of our app is static. Think of it as a big tree with branches. If one branch changes, it means we can tear off the branch (the old code) and graft on a new one (the new code that Webpack just compiled) without stopping the rest of the code from running.
    Landing
   /
App
   \
    Search — ShowCard
That's our app as it stands in terms of dependencies. App imports Search which imports ShowCard. If Landing changes, we can leave App, Search, and ShowCard running as is and just graft on a new Landing. If Search changes, we have to graft on a whole new Search which includes new ShowCards.
This is accomplished with some black magic from Webpack and Babel. Babel when it transforms your code from JSX to JS and from ES6+ to ES5 will also instrument your modules with the ability to be replaced. We'll then insert a small client into our code that will receive small JSON packages via websockets and insert those into our running code. None of these details are important: mostly it's just for your information. react-hot-loader, Webpack, and Babel largely abstract these away from you.

*/