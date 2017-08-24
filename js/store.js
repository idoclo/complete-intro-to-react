import { createStore, compose } from 'redux';
import reducer from './reducers';

const store = createStore(
  reducer,
  compose(typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f) // compose typeof window means if we are still in the browser. If these two conditions are met, open the devTools extension
); 

export default store;