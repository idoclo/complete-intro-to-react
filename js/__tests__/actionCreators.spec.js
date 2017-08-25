// @flow

import moxios from 'moxios'; // a mock version of axios; it comes with the axios library
import { setSearchTerm, addAPIData, getAPIDetails } from '../actionCreators';

// Testing actionCreators is just snapshot testing

const masterOfNone = {
  title: "Master of None",
  year: "2015-",
  description: "The personal and professional life of Dev, a 30-year-old actor in New York.",
  poster: "mon.jpg",
  imdbID: "tt4635276",
  trailer: "6bFvb3WKISk",
  rating: "1.5"
}


test('setSearchTerm', () => {
  // an action creator function returns a JSON object so we can see if it matches a snapshot
  expect(setSearchTerm('Atlanta')).toMatchSnapshot();
});

test('addAPIData', () => {
  expect(addAPIData(masterOfNone)).toMatchSnapshot();
});

// testing thunk
// an integration test between getAPIDetails and addAPIData functions: testing that the correct api is being called and that the correct action is being dispatched
test('getAPIDetails', (done: Function) => {
  moxios.withMock(() => {
    const dispatchMock = jest.fn(); // a spy function
    const thunk = getAPIDetails(masterOfNone.imdbID);
    thunk(dispatchMock);
    moxios.wait(() => {
      const request = moxios.requests.mostRecent(); // 1st thing we test is: was it called with the right url / did our thunk reach out to the correct api?
      request
        .respondWith({
          status: 200,
          response: masterOfNone
        })
        .then(() => {
          expect(request.url).toEqual(`http://localhost:3000/${masterOfNone.imdbID}`);
          expect(dispatchMock).toBeCalledWith(addAPIData(masterOfNone)); // toBeCalledWith is a function of the spy function. 2nd thing we test is: is the correct action is being dispatched?
          done();
        });
    });
  });
});