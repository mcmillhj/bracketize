// @flow

import * as reducerTypes from 'constants/reducerTypes';
import { db } from 'firebaze';

export const watchBracket = (authUser: Object, bracketId: number) => (dispatch: Function) => {
  const bracketRef = db.subscribeBracket(authUser.uid, bracketId);

  bracketRef.on('child_added', snapshot => {
    console.log('VALUE = ', snapshot.ref.parent);
    dispatch({
      type: reducerTypes.WATCH_BRACKET,
      payload: { [snapshot.key]: snapshot.val(), id: snapshot.ref.parent.key }
    });
  });
};

// reducer
const initialState = null;

export const reducer = (state = initialState, action: Object) => {
  switch (action.type) {
    case reducerTypes.WATCH_BRACKET:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
