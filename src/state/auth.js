// @flow

import { handleActions } from 'redux-actions';

import * as reducerTypes from 'constants/reducerTypes';

const initialState = {
  authUser: null
};
const actions = {
  [reducerTypes.SET_AUTH_USER]: (state, action) => ({ ...state, authUser: action.payload })
};
export const reducer = handleActions(actions, initialState);

export const setAuthUser = (payload: Object) => ({ type: reducerTypes.SET_AUTH_USER, payload });
