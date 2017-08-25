import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'; // thunk is a function that will return a value at runtime
import reducer from './reducers';
// import promise from 'redux-promise-middleware'; // can add promises to handle asynchronous calls wit thunk

const store = createStore(
  reducer,
  // compose is middleware that intercepts all the actions and feeds it to the dev tools
  // compose typeof window means if we are still in the browser. If these two conditions are met, open the devTools extension
  compose(
    applyMiddleware(thunk),
    typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f) 
); 

export default store; // the store is imported by App.jsx and injected by a Provider component for the whole app to have access to the store