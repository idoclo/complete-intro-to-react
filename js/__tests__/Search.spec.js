// @flow

import React from 'react';
import { shallow, render } from 'enzyme';
import { Provider } from 'react-redux'; // for the 3rd test so it can provide the store to it
import { MemoryRouter } from 'react-router-dom'; // for 3rd test
import store from '../store';
import { setSearchTerm } from '../actionCreators';
import preload from '../../data.json';
import Search, { Unwrapped as UnwrappedSearch } from '../Search';
import ShowCard from '../ShowCard';


test('Search renders correctly', () => {
  const component = shallow(<UnwrappedSearch shows={preload.shows} searchTerm="" />);
  expect(component).toMatchSnapshot();
});

test('Search should render correct amount of shows', () => {
  const component = shallow(<UnwrappedSearch shows={preload.shows} searchTerm="" />);
  expect(component.find(ShowCard).length).toEqual(preload.shows.length);
});

test('Search should render correct amount of shows based on search term - without Redux', () => {
  // Unit test
  const searchWord = 'black';
  const component = shallow(<UnwrappedSearch shows={preload.shows} searchTerm={searchWord} />);
  // component.find('input').simulate('change', { target: { value: searchWord } });
  const showCount = preload.shows.filter(
    show => `${show.title} ${show.description}`.toUpperCase().indexOf(searchWord.toUpperCase()) >= 0
  ).length;
  expect(component.find(ShowCard).length).toEqual(showCount);
});

test('Search should render correct amount of shows based on search term - with Redux', () => {
  // Integration test between redux, passing in the store, passing in an action and getting a new state back
  const searchWord = 'black';
  store.dispatch(setSearchTerm(searchWord));
  const component = render(
    <Provider store={store} >
      <MemoryRouter>
        <Search shows={preload.shows} searchTerm={searchWord} />
      </MemoryRouter>
    </Provider>
  );
  // component.find('input').simulate('change', { target: { value: searchWord } });
  const showCount = preload.shows.filter(
    show => `${show.title} ${show.description}`.toUpperCase().indexOf(searchWord.toUpperCase()) >= 0
  ).length;
  expect(component.find('.show-card').length).toEqual(showCount);
});
