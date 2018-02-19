// @flow

import * as reducerTypes from 'constants/reducerTypes';
import { db } from 'firebaze';

export const createBracket = (authUser: Object, payload: Object) => (dispatch: Function) => {
  dispatch(createBracketRequest());

  return db
    .doCreateBracket(authUser.uid, payload)
    .then(response => {
      dispatch(createBracketComplete(response.key));
    })
    .catch(error => {
      dispatch(createBracketFailed(error));
    });
};

export const createBracketComplete = (payload: Object) => ({ type: reducerTypes.CREATE_BRACKET, payload });
export const createBracketRequest = () => ({ type: reducerTypes.CREATE_BRACKET_REQUEST });
export const createBracketFailed = (error: Object) => ({ type: reducerTypes.CREATE_BRACKET_FAILURE, payload: error });

// reducer

const initialState = {
  isLoading: true,
  isError: false,
  error: {},
  id: null
};

export const reducer = (state: Object = initialState, action: Object) => {
  switch (action.type) {
    case reducerTypes.CREATE_BRACKET_REQUEST:
      return Object.assign({}, state, {
        isLoading: true
      });
    case reducerTypes.CREATE_BRACKET:
      return Object.assign({}, state, {
        isLoading: false,
        isError: false,
        id: action.payload
      });
    case reducerTypes.CREATE_BRACKET_FAILURE:
      return Object.assign({}, state, {
        isLoading: false,
        isError: true,
        error: action.payload
      });
    default:
      return state;
  }
};
