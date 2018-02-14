import { createStore, compose } from 'redux';
// import thunk from 'redux-thunk';

import rootReducer from 'reducers';

export default function configureStore(initialState = {}) {
  // const middleware = [
  //   thunk
  // ];

  /* eslint-disable no-underscore-dangle, no-undef */
  const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
  const store = createStore(rootReducer, initialState, composeEnhancers());

  return store;
}
