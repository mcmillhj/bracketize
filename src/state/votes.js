// @flow

import * as reducerTypes from 'constants/reducerTypes';
import { db } from 'firebaze';
import _ from 'lodash';

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
      const { vote } = seed;

      const newState = { ...state, [round]: { ...(state[round] || {}) } };
      if (newState[round][seed.seed]) {
        newState[round][seed.seed] += vote;
      } else {
        newState[round][seed.seed] = 1;
      }

      return { ...newState, [round]: { ..._.pickBy(newState[round], _.identity) } };
    default:
      return state;
  }
};
