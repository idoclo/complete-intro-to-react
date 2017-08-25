// @flow

import { setSearchTerm, addAPIData } from '../actionCreators';

// Testing actionCreators is just snapshot testing

describe('setSearchTerm', () => {

  it('returns an object with the expected action type and action payload', () => {
    // an action creator function returns a JSON object so we can see if it matches a snapshot
    expect(setSearchTerm('Atlanta')).toMatchSnapshot();
  });

});


describe('addAPIData', () => {
  it('returns the expected JSON object', () => {
    expect(
      addAPIData({
        title: "Master of None",
        year: "2015-",
        description: "The personal and professional life of Dev, a 30-year-old actor in New York.",
        poster: "mon.jpg",
        imdbID: "tt4635276",
        trailer: "6bFvb3WKISk",
        rating: "1.5"
      })
    ).toMatchSnapshot();
  });
});