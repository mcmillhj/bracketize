// @flow

import * as reducerTypes from 'constants/reducerTypes';
import { db } from 'firebaze';

export const voteSeed = id => (dispatch: Function) => {
  const bracketsRef = db.subscribeBrackets();

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
const initialState = {
  id: null,
  vote: 0
};

export const reducer = (state: Object = initialState, action: Object) => {
  switch (action.type) {
    case reducerTypes.VOTE_SEED:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
