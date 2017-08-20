import React, { Component } from 'react';
import preload from '../data.json';
import ShowCard from './ShowCard';

class Search extends Component {
  // Through adding "parser": "babel-eslint" in .eslint file we can write the constructor this way and bind methods to this like on line 11.
  state = {
      searchTerm: ''
  };

  // Writing method like this automatically binds this to it forever because arrow functions never lose their context. Enabling EsLint to take contructor and methods like this is a good idea.
  handleSeachTermChange = event => {
    this.setState({
      searchTerm: event.target.value
    });
    event.preventDefault();
  }

  render() {
    return (
      <div className="search">
        {/* <pre><code>{JSON.stringify(preload, null, 4)}</code></pre> */}
        <header>
          <h1>svideo</h1>
          <input
            onChange={this.handleSeachTermChange}
            value={this.state.searchTerm}
            type="text"
            placeholder="Search"
          />
        </header>
        <div>
          {preload.shows
            .filter(show =>
              `${show.title} ${show.description}`.toUpperCase().indexOf(this.state.searchTerm.toUpperCase()) >= 0
            )
            .map(show => <ShowCard show={show} key={show.imdbID} />)}
        </div>
      </div>
    );
  }
}

export default Search;