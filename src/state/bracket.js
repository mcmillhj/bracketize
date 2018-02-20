// @flow

import * as reducerTypes from 'constants/reducerTypes';
import { db } from 'firebaze';

export const getBracket = (authUser: Object, bracketId: number) => (dispatch: Function) => {
  const bracketRef = db.subscribeBracket(authUser.uid, bracketId);

  bracketRef.on('value', snapshot => {
    dispatch({
      type: reducerTypes.GET_BRACKET,
      payload: { ...snapshot.val(), id: snapshot.key }
    });
  });
};

// reducer
const initialState = null;

export const reducer = (state: Object | null = initialState, action: Object) => {
  switch (action.type) {
    case reducerTypes.GET_BRACKET:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
