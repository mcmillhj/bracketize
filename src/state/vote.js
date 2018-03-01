// @flow

import * as reducerTypes from 'constants/reducerTypes';
import { db } from 'firebaze';

export const voteSeed = (id: number, user_id: number, round: number, seed: Object) => (dispatch: Function) =>
  db
    .doUpdateBracketWithVotes(id, user_id, seed)
    .then(() => dispatch({ type: reducerTypes.VOTE_SEED, payload: { seed, round } }))
    .catch(err => console.error('ERR = ', err));

// reducer
const initialState = {};

export const reducer = (state: Object = initialState, action: Object) => {
  switch (action.type) {
    case reducerTypes.VOTE_SEED:
      const { round, seed } = action.payload;
      return { ...state, [round]: { ...(state[round] || {}), [seed.seed]: 1 } };
    default:
      return state;
  }
};
