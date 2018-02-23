// @flow

import * as reducerTypes from 'constants/reducerTypes';
import { db } from 'firebaze';

export const getBrackets = (authUser: Object) => (dispatch: Function) => {
  const bracketsRef = db.getBrackets(authUser.uid);

  bracketsRef.on('value', snapshot => {
    if (snapshot && snapshot.val()) {
      dispatch({
        type: reducerTypes.GET_BRACKETS,
        payload: Object.keys(snapshot.val()).map(k => ({
          id: k,
          ...snapshot.val()[k]
        }))
      });
    }
  });
};

export const ungetBrackets = (authUser: Object) => () => db.getBrackets(authUser.uid).off('value');

// reducer
const initialState = [];

export const reducer = (state: Array<Object> = initialState, action: Object) => {
  switch (action.type) {
    case reducerTypes.GET_BRACKETS:
      return action.payload;
    case reducerTypes.DELETE_BRACKET:
      return state.filter(b => b.id !== action.payload);
    default:
      return state;
  }
};
