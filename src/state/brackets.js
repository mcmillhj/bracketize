// @flow

import _ from 'lodash';

import * as reducerTypes from 'constants/reducerTypes';
import { db } from 'firebaze';

export const getBrackets = (authUser: Object) => (dispatch: Function) => {
  const bracketsRef = db.subscribeBrackets(authUser.uid);

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

// reducer
const initialState = [];

export const reducer = (state: Array<Object> = initialState, action: Object) => {
  switch (action.type) {
    case reducerTypes.GET_BRACKETS:
      return _.uniqBy([...state, ...action.payload], b => b.id);
    default:
      return state;
  }
};
