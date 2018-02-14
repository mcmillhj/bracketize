import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import { reducer as seeds } from 'state/seeds';

export default combineReducers({
  form: formReducer,
  seeds
});
