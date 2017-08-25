// @flow

import React from 'react';
import { Route, Switch } from 'react-router-dom';
import type { Match } from 'react-router-dom';
import { Provider } from 'react-redux'; // make redux available to react. Provider is a higher-order component which itself does not do anything but makes the store available to the app.
import store from './store'; // need to provide the store to Provider
import Landing from './Landing';
import Search from './Search';
import Details from './Details';
import preload from '../data.json';

const FourOhFour = () => <h1>404</h1>;

const App = () =>
    <Provider store={store}>
      <div className="app">
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route path="/search" component={props => <Search shows={preload.shows} {...props} />} />
          <Route
            path="/details/:id"
            component={(props: { match: Match }) => {
              const selectedShow = preload.shows.find(show => props.match.params.id === show.imdbID);
              console.log('props in Details', props, 'selectedShow', selectedShow);
              return <Details show={selectedShow} {...props} />;
            }}
          />
          <Route component={FourOhFour} />
        </Switch>
      </div>
    </Provider>

export default App;