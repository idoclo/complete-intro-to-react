import React from 'react';
// import renderer from 'react-test-renderer';
import { shallow } from 'enzyme'; // commented out renderer import because enzyme uses renderer under the hood
import preload from '../../data.json';
import Search from '../Search';
import ShowCard from '../ShowCard'

// Remember to add all the "env" in .eslintrc.json file "jest". It tells lint to ignore all the stuff that Jest injects.

// How to fix problem with "import" statement? (It is trying to run in Node and node doesn't know ES6.)
// Go to babelrc and include stuff from line 15 onwards.

// Inside of Package.json file insert a jest configuration (line 13) tell Jest how to snapshot enzyme components.

test('Search renders correctly', () => {
  const component = shallow(<Search />);
  expect(component).toMatchSnapshot();
  // First time .toMatchSnapshot invokes, it saves a snapshot in a file called __snapshots__
});

test('Search should render correct amount of shows', () => {
  const component = shallow(<Search />);
  // .find() can be done with React components or CSS selectors
  expect(component.find(ShowCard).length).toEqual(preload.shows.length);
});

test('Search should render correct amount of shows based on search term', () => {
  const searchWord = 'thrones';
  const component = shallow(<Search />);
  component.find('input').simulate('change', {target:{value:searchWord}});
  const showCount = preload.shows.filter(show =>
    `${show.title} ${show.description}`.toUpperCase().indexOf(searchWord.toUpperCase()) > -1
  ).length;
  expect(component.find(ShowCard).length).toEqual(showCount);
});