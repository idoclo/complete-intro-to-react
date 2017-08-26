// @flow

import React from 'react';
import { Route, Switch } from 'react-router-dom';
import type { Match } from 'react-router-dom';
import { Provider } from 'react-redux'; // make redux available to react. Provider is a higher-order component which itself does not do anything but makes the store available to the app.
import store from './store'; // need to provide the store to Provider
import AsyncRoute from './AsyncRoute';
// import Landing from './Landing'; // removed this once we include AsyncRoute because now we don't want to include it in initial bundle, only when we require it
// import Search from './Search'; // removed this once we include AsyncRoute because now we don't want to include it in initial bundle, only when we require it
// import Details from './Details'; // removed this once we include AsyncRoute because now we don't want to include it in initial bundle, only when we require it
import preload from '../data.json';

const FourOhFour = () => <h1>404</h1>;

const App = () =>
    <Provider store={store}>
      <div className="app">
        <Switch>
          {/* <Route exact path="/" component={Landing} /> */}
          {/* <Route path="/search" component={props => <Search shows={preload.shows} {...props} />} /> */}
          {/* <Route
            path="/details/:id"
            component={(props: { match: Match }) => {
              const selectedShow = preload.shows.find(show => props.match.params.id === show.imdbID);
              // console.log('props in Details', props, 'selectedShow', selectedShow);
              return <Details show={selectedShow} {...props} />;
            }}
          /> */}
          <Route
            exact path="/"
            component={(props) => <AsyncRoute props={props} loadingPromise={import('./Landing')} />}
          />
          <Route
            path="/search"
            component={props => (
              <AsyncRoute props={Object.assign({ shows: preload.shows }, props)} loadingPromise={import('./Search')} />
            )}
          />
          <Route
            path="/details/:id"
            component={(props: { match: Match }) => {
              const selectedShow = preload.shows.find(show => props.match.params.id === show.imdbID);
              // console.log('props in Details', props, 'selectedShow', selectedShow);
              return <AsyncRoute props={Object.assign({show: selectedShow, match: {}}, props)} loadingPromise={import('./Details')}/>;
            }}
          />
          <Route component={FourOhFour} />
        </Switch>
      </div>
    </Provider>

export default App;