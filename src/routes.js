import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Account from 'components/Account';
import Bracket from 'components/Bracket';
import Brackets from 'components/Brackets';
import CreateBracket from 'components/CreateBracket';
import ForgotPassword from 'components/ForgotPassword';
import Home from 'components/Home';
import SignIn from 'components/SignIn';
import SignUp from 'components/SignUp';

export default () => (
  <main>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/account" component={Account} />
      <Route path="/bracket/:id" component={Bracket} />
      <Route path="/brackets" component={Brackets} />
      <Route path="/create-bracket" component={CreateBracket} />
      <Route path="/forgot-password" component={ForgotPassword} />
      <Route path="/signin" component={SignIn} />
      <Route path="/signup" component={SignUp} />
      <Route
        component={({ location }) => (
          <div>
            <h3>
              No matching route for <code>{location.pathname}</code>
            </h3>
          </div>
        )}
      />
    </Switch>
  </main>
);
