// @flow

import * as reducerTypes from 'constants/reducerTypes';
import { db } from 'firebaze';

export const createBracket = ({ authUser, seeds }) => dispatch => {
  dispatch(createBracketRequest());

  return db
    .doCreateBracket(authUser.uid, seeds)
    .then(response => {
      dispatch(createBracketComplete(response.key));
    })
    .catch(error => {
      dispatch(createBracketFailed(error));
    });
};

export const createBracketComplete = (payload: Object) => ({ type: reducerTypes.CREATE_BRACKET, payload });
export const createBracketRequest = () => ({ type: reducerTypes.CREATE_BRACKET_REQUEST });
export const createBracketFailed = () => ({ type: reducerTypes.CREATE_BRACKET_FAILURE });

// reducer

const initialState = {
  isLoading: true,
  isError: false,
  error: {},
  id: null
};

export const reducer = (state = initialState, action) => {
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
