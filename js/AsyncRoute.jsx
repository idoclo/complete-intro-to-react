// @flow

import React, { Component } from 'react';
import Spinner from './Spinner';

class AsyncRoute extends Component {
  state = {
    loaded: false // by default it's not going to be loaded
  }
  componentDidMount() {
    this.props.loadingPromise.then(module => {
      this.component = module.default;
      this.setState({ loaded: true });
    });
  }
  props: { // define the type of the two props this component will have
    props: mixed,
    loadingPromise: Promise<{ default: Class<React.Component<*, *, *>>}> // if a Promise you have to define what the promise it gives back will be; in this case an {} containing what is gonna come back from webpack when it loads your code asynchronously. {} has default property which will be a Class and the type of Class it is is a React Component. The three different type of props a React component can take: default props, props, state.
  };
  component = null; // put the component on the class itself so React doesn't check that for rerenders. We want to load the component once only.
  render() {
    if (this.state.loaded) {
      return <this.component {...this.props.props} />
    }
    return <Spinner />
  }
}

export default AsyncRoute;

/*
AsyncRoute will be a higher order component.
When it renders it will fetch the component that you ask for and only after it has fetched data will it render itself.
*/