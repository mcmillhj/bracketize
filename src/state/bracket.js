// @flow

import * as reducerTypes from 'constants/reducerTypes';
import { db } from 'firebaze';

export const getBracket = (id: number) => (dispatch: Function) => {
  dispatch({ type: reducerTypes.GET_BRACKET_REQUEST });

  const bracketRef = db.getBracket(id);

  bracketRef.on('value', snapshot => {
    dispatch({
      type: reducerTypes.GET_BRACKET,
      payload: { ...snapshot.val(), id: snapshot.key }
    });
  });
};

export const ungetBracket = (authUser: Object) => () => db.getBracket(authUser.uid).off('value');

export const changeComplete = (id: number, user_id: number) => () =>
  db.doUpdateBracket(id, user_id, { complete: true });
export const changeRound = (id: number, user_id: number, round: number) => () =>
  db.doUpdateBracket(id, user_id, { round });

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
