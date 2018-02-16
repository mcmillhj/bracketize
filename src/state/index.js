import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import { reducer as auth } from 'state/auth';
import { reducer as seeds } from 'state/seeds';

export default combineReducers({
  auth,
  form: formReducer,
  seeds
});
