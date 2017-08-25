// @flow

import { combineReducers } from 'redux';
import { SET_SEARCH_TERM, ADD_API_DATA } from './actions';

/*
OLD WAY
const DEFAULT_STATE = {
  searchTerm: ''
};

const setSearchTerm2 = (state, action) => Object.assign({}, state, { searchTerm: action.payload });

// rootReducer is pretty much the dispatch function
// a reducer takes a state and an action and returns a new state
const rootReducer = (state = DEFAULT_STATE, action) => {
  // switch (action.type) {
  //   case SET_SEARCH_TERM: 
  //     return setSearchTerm(state, action);
  //   default:
  //   return state;
  // }
  if (action.type === SET_SEARCH_TERM) {
    return setSearchTerm2(state, action)
  }
  // default
  return state;
}
*/

const searchTerm = (state='', action: Action) => {
  if (action.type === SET_SEARCH_TERM) {
    return action.payload
  }
  return state;
};

const apiData = (state={}, action: Action) => {
  if (action.type === ADD_API_DATA) {
    // At this point I know that the payload is a Show
    /* The ES5 way
    const key = action.payload.imdbID;
    const obj = {};
    obj[key] = action.payload;
    */
    return Object.assign({}, { [action.payload.imdbID]: action.payload }); // the square brackets says make these contents the key
  }
  return state;
};

// combineReducers does the object merging (for reducers) for you behind the scenes
const rootReducer = combineReducers({
  searchTerm,
  apiData
});

export default rootReducer;