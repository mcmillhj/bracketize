// @flow

import * as reducerTypes from 'constants/reducerTypes';
import { db } from 'firebaze';

export const voteSeed = (id: number, user_id: number, seed: Object) => () => {
  return db
    .doUpdateBracketWithVotes(id, user_id, seed)
    .then(resp => console.log('RESP = ', resp))
    .catch(err => console.error('ERR = ', err));
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
