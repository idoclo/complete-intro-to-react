// @flow

import React, { Component } from 'react';
// import { string } from 'prop-types'; // No longer needed because flow is more robust for this
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Wrapper = styled((Link: any))`
  width: 32%;
  border: 2px solid #333;
  border-radius: 4px;
  margin-bottom: 25px;
  padding-right: 10px;
  overflow: hidden;
  color: black;
  text-decoration: none;
`;

const Image = styled.img`
  width: 46%;
  float: left;
  margin-right: 10px;
`;

class ShowCard extends Component {
  // native React method that says, "Once component has rendered for first time, never re-render it (as it will not change)."
  shouldComponentUpdate() {
    return false;
  };
  props: Show;
  render() {
    return (
      <Wrapper to={`/Details/${this.props.imdbID}`}>
        <Image alt={`${this.props.title} Show Poster`} src={`/public/img/posters/${this.props.poster}`} />
        <div>
          <h3>{this.props.title}</h3>
          <h4>({this.props.year})</h4>
          <p>{this.props.description}</p>
        </div>
      </Wrapper>
    );
  }
}

export default ShowCard;
