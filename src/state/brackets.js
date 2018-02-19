// @flow

import * as reducerTypes from 'constants/reducerTypes';
import { db } from 'firebaze';

export const watchBrackets = (authUser: Object) => (dispatch: Function) => {
  const bracketsRef = db.subscribeBrackets(authUser.uid);

  bracketsRef.on('child_added', snapshot =>
    dispatch({ type: reducerTypes.WATCH_BRACKETS, payload: { ...snapshot.val(), id: snapshot.key } })
  );
};

// reducer
const initialState = [];

export const reducer = (state = initialState, action: Object) => {
  switch (action.type) {
    case reducerTypes.WATCH_BRACKETS:
      return [...state, action.payload];
    default:
      return state;
  }
};
