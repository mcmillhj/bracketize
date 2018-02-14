// @flow

import _ from 'lodash';
import { handleActions } from 'redux-actions';

import * as reducerTypes from 'constants/reducerTypes';

const initialState = [];
const actions = {
  [reducerTypes.ADD_SEED]: (state: Array<Object>, { payload }: { payload: Object }): Array<Object> =>
    _.sortedUniqBy([...state, payload], ({ title }: { title: string }) => title),
  [reducerTypes.REMOVE_SEED]: (state: Array<Object>, { payload }: { payload: Object }) =>
    state.filter(s => !_.isEqual(s, payload))
};
export const reducer = handleActions(actions, initialState);

export const addSeed = (payload: Object) => ({ type: reducerTypes.ADD_SEED, payload });
export const removeSeed = (payload: Object) => ({ type: reducerTypes.REMOVE_SEED, payload });
