// @flow

import * as reducerTypes from 'constants/reducerTypes';
import { db } from 'firebaze';

export const getBracket = (id: number) => (dispatch: Function) => {
  dispatch({ type: reducerTypes.GET_BRACKET_REQUEST });

  const bracketRef = db.subscribeBracket(id);

  bracketRef.on('value', snapshot => {
    dispatch({
      type: reducerTypes.GET_BRACKET,
      payload: { ...snapshot.val(), id: snapshot.key }
    });
  });
};

export const deleteBracket = (authUser: Object, bracketId: number) => (dispatch: Function) => {
  return db
    .doDeleteBracket(authUser.uid, bracketId)
    .then(() => dispatch({ type: reducerTypes.DELETE_BRACKET, payload: bracketId }))
    .catch(error => console.error(error));
};

// reducer
const initialState = {
  isLoading: true,
  isError: false, // TODO
  bracket: null
};

export const reducer = (state: Object | null = initialState, action: Object) => {
  switch (action.type) {
    case reducerTypes.GET_BRACKET_REQUEST:
      return { ...state, isLoading: true };
    case reducerTypes.GET_BRACKET:
      return { ...state, isLoading: false, bracket: action.payload };
    default:
      return state;
  }
};
