// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import type { RouterHistory } from 'react-router-dom';
import { setSearchTerm } from './actionCreators';

class Landing extends Component {

  props: {
    searchTerm: string,
    handleSearchTermChange: Function,
    history: RouterHistory
  };

  // When you hit enter on the input field on the Landing page it goes to Search component
  // Make this method arrow function because it is going to refer to something in context
  // Because Landing component is a route, it has access to history
  goToSearch = (event: SyntheticEvent) => {
    event.preventDefault();
    this.props.history.push('/search');
  }

  render() {
    return (
      <div className="landing">
        <h1>svideo</h1>
        <h2>{this.props.searchTerm}</h2>
        <form onSubmit={this.goToSearch}>
          <input
            onChange={this.props.handleSearchTermChange}
            value={this.props.searchTerm}
            type="text"
            placeholder="Search"
          />
        </form>
        <Link to="/search">or Browse All</Link>
      </div>
    )
  }
}


// take the whole state of redux and pulls out just the parts you need
const mapStateToProps = state => ({ searchTerm: state.searchTerm });

// enable this component to dispatch actions which update redux state
const mapDispatchToProps = (dispatch: Function) => ({
  handleSearchTermChange(event) {
    dispatch(setSearchTerm(event.target.value));
  }
});

// connect the component to this state of redux that you have pulled out, also dispatch function
export default connect(mapStateToProps, mapDispatchToProps)(Landing);


// if this component was a class component, you would include the following line above the class component declaration
// @connect(mapStateToProps)
// then no need for the connect function on line 19