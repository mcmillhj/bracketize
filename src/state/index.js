import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import { reducer as auth } from 'state/auth';
import { reducer as bracket } from 'state/bracket';
import { reducer as brackets } from 'state/brackets';
import { reducer as createBracket } from 'state/createBracket';
import { reducer as seeds } from 'state/seeds';

export default combineReducers({
  auth,
  bracket,
  brackets,
  createBracket,
  form: formReducer,
  seeds
});
